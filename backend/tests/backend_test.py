"""Backend tests for Mundo IA API."""
import os
import pytest
import requests

BASE_URL = os.environ.get("REACT_APP_BACKEND_URL", "https://mundo-ia-2026.preview.emergentagent.com").rstrip("/")
API = f"{BASE_URL}/api"


@pytest.fixture(scope="module")
def session():
    s = requests.Session()
    s.headers.update({"Content-Type": "application/json"})
    return s


# === Root and health ===
def test_root(session):
    r = session.get(f"{API}/")
    assert r.status_code == 200
    assert "message" in r.json()


# === Categories ===
def test_categories(session):
    r = session.get(f"{API}/categories")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) == 5
    slugs = {c["slug"] for c in data}
    expected = {"herramientas-ia", "prompts", "ganar-dinero", "automatizacion", "ia-estudiantes"}
    assert slugs == expected
    for c in data:
        assert "count" in c
        assert isinstance(c["count"], int)
        assert "_id" not in c


# === Articles ===
def test_articles_list(session):
    r = session.get(f"{API}/articles")
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 10
    for a in data:
        assert "_id" not in a
        assert "slug" in a and "title" in a


def test_articles_filter_category(session):
    r = session.get(f"{API}/articles", params={"category": "herramientas-ia"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0
    for a in data:
        assert a["category"] == "herramientas-ia"


def test_articles_featured(session):
    r = session.get(f"{API}/articles", params={"featured": "true"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) == 3
    for a in data:
        assert a["featured"] is True


def test_articles_search(session):
    r = session.get(f"{API}/articles", params={"q": "prompts"})
    assert r.status_code == 200
    data = r.json()
    assert len(data) > 0


def test_articles_popular(session):
    r = session.get(f"{API}/articles/popular")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) <= 5
    assert len(data) > 0


def test_article_by_slug_and_views(session):
    slug = "mejores-herramientas-inteligencia-artificial-2026"
    r1 = session.get(f"{API}/articles/{slug}")
    assert r1.status_code == 200
    a1 = r1.json()
    assert a1["slug"] == slug
    assert "content" in a1
    assert "_id" not in a1
    v1 = a1["views"]
    r2 = session.get(f"{API}/articles/{slug}")
    assert r2.status_code == 200
    v2 = r2.json()["views"]
    assert v2 > v1


def test_article_related(session):
    slug = "mejores-prompts-inteligencia-artificial-que-funcionan"
    r = session.get(f"{API}/articles/{slug}/related")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    # Ensure current slug not included
    for a in data:
        assert a["slug"] != slug


def test_article_404(session):
    r = session.get(f"{API}/articles/nonexistent-slug-xyz")
    assert r.status_code == 404


# === Contact ===
def test_contact_valid(session):
    payload = {
        "name": "TEST_User",
        "email": "test@example.com",
        "subject": "TEST Subject",
        "message": "This is a long enough test message."
    }
    r = session.post(f"{API}/contact", json=payload)
    assert r.status_code == 201
    data = r.json()
    assert "id" in data
    assert len(data["id"]) >= 32  # UUID
    assert data["email"] == payload["email"]


def test_contact_invalid_email(session):
    payload = {
        "name": "TEST_User",
        "email": "not-an-email",
        "subject": "Test",
        "message": "This is a long enough test message."
    }
    r = session.post(f"{API}/contact", json=payload)
    assert r.status_code == 422


# === Newsletter ===
def test_newsletter_idempotent(session):
    email = "test_newsletter_mundoia@example.com"
    payload = {"email": email}
    r1 = session.post(f"{API}/newsletter", json=payload)
    assert r1.status_code == 201
    id1 = r1.json()["id"]
    r2 = session.post(f"{API}/newsletter", json=payload)
    assert r2.status_code == 201
    assert r2.json()["id"] == id1


# === Stats ===
def test_stats(session):
    r = session.get(f"{API}/stats")
    assert r.status_code == 200
    data = r.json()
    for k in ("articles", "categories", "subscribers", "total_views"):
        assert k in data
    assert data["articles"] == 10
    assert data["categories"] == 5


# === ads.txt ===
def test_ads_txt(session):
    r = session.get(f"{BASE_URL}/ads.txt")
    assert r.status_code == 200
    assert "pub-4065544185286337" in r.text
    assert "google.com" in r.text

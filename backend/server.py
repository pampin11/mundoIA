from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import PlainTextResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

from articles_data import ARTICLES, CATEGORIES


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

app = FastAPI(title="Mundo IA API", version="1.0.0")
api_router = APIRouter(prefix="/api")


# ====== MODELS ======
class Category(BaseModel):
    slug: str
    name: str
    description: str
    color: str
    count: Optional[int] = 0


class ArticleSummary(BaseModel):
    slug: str
    title: str
    excerpt: str
    category: str
    tags: List[str]
    cover: str
    reading_time: int
    featured: bool
    published_at: str


class Article(ArticleSummary):
    content: str
    views: int = 0


class ContactCreate(BaseModel):
    name: str = Field(min_length=2, max_length=80)
    email: EmailStr
    subject: str = Field(min_length=2, max_length=120)
    message: str = Field(min_length=10, max_length=2000)


class ContactResponse(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str


class NewsletterCreate(BaseModel):
    email: EmailStr


class NewsletterResponse(BaseModel):
    id: str
    email: str
    created_at: str


# ====== SEED ======
async def seed_database():
    cat_count = await db.categories.count_documents({})
    if cat_count == 0:
        await db.categories.insert_many([c.copy() for c in CATEGORIES])
        logging.info("Categorías sembradas")

    art_count = await db.articles.count_documents({})
    if art_count == 0:
        docs = []
        for a in ARTICLES:
            doc = a.copy()
            doc['id'] = str(uuid.uuid4())
            doc['views'] = 0
            docs.append(doc)
        await db.articles.insert_many(docs)
        logging.info(f"{len(docs)} artículos sembrados")


# ====== ROUTES ======
@api_router.get("/")
async def root():
    return {"message": "Mundo IA API", "version": "1.0.0"}


@api_router.get("/categories", response_model=List[Category])
async def get_categories():
    cats = await db.categories.find({}, {"_id": 0}).to_list(100)
    for c in cats:
        c['count'] = await db.articles.count_documents({"category": c['slug']})
    return cats


@api_router.get("/articles", response_model=List[ArticleSummary])
async def list_articles(
    category: Optional[str] = Query(None),
    featured: Optional[bool] = Query(None),
    q: Optional[str] = Query(None),
    limit: int = Query(50, le=100),
    skip: int = Query(0, ge=0),
):
    query = {}
    if category:
        query['category'] = category
    if featured is not None:
        query['featured'] = featured
    if q:
        query['$or'] = [
            {"title": {"$regex": q, "$options": "i"}},
            {"excerpt": {"$regex": q, "$options": "i"}},
            {"tags": {"$regex": q, "$options": "i"}},
        ]

    cursor = db.articles.find(query, {"_id": 0, "content": 0}).sort("published_at", -1).skip(skip).limit(limit)
    return await cursor.to_list(limit)


@api_router.get("/articles/popular", response_model=List[ArticleSummary])
async def popular_articles(limit: int = 5):
    cursor = db.articles.find({}, {"_id": 0, "content": 0}).sort("views", -1).limit(limit)
    results = await cursor.to_list(limit)
    if not results or all(r.get('views', 0) == 0 for r in results):
        cursor = db.articles.find({}, {"_id": 0, "content": 0}).sort("published_at", -1).limit(limit)
        results = await cursor.to_list(limit)
    return results


@api_router.get("/articles/{slug}", response_model=Article)
async def get_article(slug: str):
    article = await db.articles.find_one({"slug": slug}, {"_id": 0})
    if not article:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    await db.articles.update_one({"slug": slug}, {"$inc": {"views": 1}})
    article['views'] = article.get('views', 0) + 1
    return article


@api_router.get("/articles/{slug}/related", response_model=List[ArticleSummary])
async def related_articles(slug: str, limit: int = 3):
    article = await db.articles.find_one({"slug": slug}, {"_id": 0, "category": 1})
    if not article:
        raise HTTPException(status_code=404, detail="Artículo no encontrado")
    cursor = db.articles.find(
        {"category": article['category'], "slug": {"$ne": slug}},
        {"_id": 0, "content": 0}
    ).sort("published_at", -1).limit(limit)
    return await cursor.to_list(limit)


@api_router.post("/contact", response_model=ContactResponse, status_code=201)
async def create_contact(body: ContactCreate):
    doc = {
        "id": str(uuid.uuid4()),
        "name": body.name,
        "email": body.email,
        "subject": body.subject,
        "message": body.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.contacts.insert_one(doc.copy())
    return doc


@api_router.post("/newsletter", response_model=NewsletterResponse, status_code=201)
async def subscribe_newsletter(body: NewsletterCreate):
    existing = await db.newsletter.find_one({"email": body.email})
    if existing:
        return {
            "id": existing['id'],
            "email": existing['email'],
            "created_at": existing['created_at'],
        }
    doc = {
        "id": str(uuid.uuid4()),
        "email": body.email,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    await db.newsletter.insert_one(doc.copy())
    return doc


@api_router.get("/stats")
async def get_stats():
    total_articles = await db.articles.count_documents({})
    total_categories = await db.categories.count_documents({})
    total_subscribers = await db.newsletter.count_documents({})
    agg = db.articles.aggregate([{"$group": {"_id": None, "total": {"$sum": "$views"}}}])
    views_list = await agg.to_list(1)
    total_views = views_list[0]['total'] if views_list else 0
    return {
        "articles": total_articles,
        "categories": total_categories,
        "subscribers": total_subscribers,
        "total_views": total_views,
    }


app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("startup")
async def startup_db():
    await seed_database()


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()

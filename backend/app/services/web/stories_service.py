from datetime import datetime

import httpx
from async_lru import alru_cache
from dateutil.relativedelta import relativedelta

from app.config import FEEDS_BASE_URL


@alru_cache(maxsize=512)
async def fetch_news_recommendations(
    start_date: int = (datetime.today() - relativedelta(months=6)).strftime("%Y-%m-%d"),
    end_date: int = datetime.today().strftime("%Y-%m-%d"),
):
    url = f"{FEEDS_BASE_URL}/{start_date}--{end_date}"
    async with httpx.AsyncClient() as client:
        response = (await client.get(url)).json()[:3]
        parsed_items = []
        for item in response:
            parse_item = {
                "url": item["Path"],
                "title": [item["title"]],
                "publication_date": item["post_date"],
                "description": [item["body"]],
            }
            parsed_items.append(parse_item)
        return {
            "recommendations": parsed_items,
            "isRand": False,
        }

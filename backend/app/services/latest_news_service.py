from datetime import datetime

import httpx
from aiocache import cached
from dateutil.relativedelta import relativedelta

from app.config import FEEDS_BASE_URL


class LatestNewsService:
    @staticmethod
    @cached(ttl=10)
    async def fetch(
        start_date: int = (datetime.today() - relativedelta(months=6)).strftime(
            "%Y-%m-%d"
        ),
        end_date: int = datetime.today().strftime("%Y-%m-%d"),
    ):
        url = f"{FEEDS_BASE_URL}/{start_date}--{end_date}"
        async with httpx.AsyncClient() as client:
            response = (await client.get(url)).json()
            return response

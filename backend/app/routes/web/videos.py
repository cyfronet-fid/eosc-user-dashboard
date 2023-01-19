# pylint: disable=missing-function-docstring

""" Events UI endpoint """

import httpx
from fastapi import APIRouter

from app.config import YOUTUBE_API_KEY, YOUTUBE_API_URL

router = APIRouter()


@router.get("/yt")
async def get_videos():
    url = f"{YOUTUBE_API_URL}?key={YOUTUBE_API_KEY}"
    url += (
        "&channelId=UCHsaUFy5LJ3rJ28qDg2StGA&part=snippet,id&order=date&maxResults=10"
    )
    videos = any

    async with httpx.AsyncClient() as client:
        resp = await client.get(url)
        resp.raise_for_status()
        videos = resp.json()

    return videos

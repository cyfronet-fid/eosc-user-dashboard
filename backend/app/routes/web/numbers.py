# pylint: disable=missing-function-docstring

""" Events UI endpoint """

from app.config import SOLR_URL, RecommendationTypes
from app.schemas.bad_request import BadRequest
import httpx
from fastapi import APIRouter, Request

from app.config import YOUTUBE_API_KEY, YOUTUBE_API_URL

router = APIRouter()


@router.get(    
    "/dash",
    responses={200: {"model": dict}, 500: {"model": BadRequest}},
    )
async def get_numbers():
    recommendation_type = "publication"
    fq = [f'type:("{recommendation_type}")']
    request_body = {
        "params": {
            "defType": "edismax",
            "q": "*",
            "qf": ["id"],
            "fq": fq,
            "rows": 1,
            "sort": ["id desc"],
            "wt": "json",
        }
    }
    
    recommendation_type = "service"
    fq = [f'type:("{recommendation_type}")']
    request_body1 = {
        "params": {
            "defType": "edismax",
            "q": "*",
            "qf": ["id"],
            "fq": fq,
            "rows": 1,
            "sort": ["id desc"],
            "wt": "json",
        }
    }
    
    recommendation_type = "software"
    fq = [f'type:("{recommendation_type}")']
    request_body2 = {
        "params": {
            "defType": "edismax",
            "q": "*",
            "qf": ["id"],
            "fq": fq,
            "rows": 1,
            "sort": ["id desc"],
            "wt": "json",
        }
    }
       
    recommendation_type = "training"
    fq = [f'type:("{recommendation_type}")']     
    request_body3 = {
        "params": {
            "defType": "edismax",
            "q": "*",
            "qf": ["id"],
            "fq": fq,
            "rows": 1,
            "sort": ["id desc"],
            "wt": "json",
        }
    }
    
    recommendation_type = "dataset"
    fq = [f'type:("{recommendation_type}")']     
    request_body4 = {
        "params": {
            "defType": "edismax",
            "q": "*",
            "qf": ["id"],
            "fq": fq,
            "rows": 1,
            "sort": ["id desc"],
            "wt": "json",
        }
    }
    
    recommendation_type = "data source"
    fq = [f'type:("{recommendation_type}")']     
    request_body5 = {
        "params": {
            "defType": "edismax",
            "q": "*",
            "qf": ["id"],
            "fq": fq,
            "rows": 1,
            "sort": ["id desc"],
            "wt": "json",
        }
    }
        
    url = f"{SOLR_URL}all_collection/select"
    publications = any
    service = any  
    software = any
    training = any
    data = any
    datasource = any

    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=request_body)
        resp.raise_for_status()
        publications = resp.json()["response"]["numFound"]
       
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=request_body1)
        resp.raise_for_status()
        service = resp.json()["response"]["numFound"] 
        
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=request_body2)
        resp.raise_for_status()
        software = resp.json()["response"]["numFound"]
        
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=request_body3)
        resp.raise_for_status()
        training = resp.json()["response"]["numFound"]
        
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=request_body4)
        resp.raise_for_status()
        data = resp.json()["response"]["numFound"]
        
    async with httpx.AsyncClient() as client:
        resp = await client.post(url, json=request_body5)
        resp.raise_for_status()
        datasource = resp.json()["response"]["numFound"]

    return {"services": service, "publications": publications, "softwares": software, "trainings": training, "data": data, "datasources": datasource}

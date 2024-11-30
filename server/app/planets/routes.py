from datetime import datetime
from typing import Annotated

from fastapi import APIRouter, Query

from app.planets.services import fetch_planet_positions

planet_router = APIRouter(prefix="/planets", tags=["Planets"])


@planet_router.get("/positions")
async def read_planet_positions(
    target_date: Annotated[
        datetime,
        Query(
            description="Date to read planet positions for",
        ),
    ],
):
    return fetch_planet_positions(target_date=target_date)

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

from .. import schemas, crud, models
from ..database import get_db
from ..dependencies import require_role

router = APIRouter(
    prefix="/agents",
    tags=["agents"],
)

@router.get("/", response_model=List[schemas.AgentWithLoad])
def list_agents(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(require_role("admin", "agent")),
):
    """
    Return all users with role='agent', each annotated with:
    - their category specializations
    - their current open ticket count (open or in_progress tickets assigned to them)

    Used by the admin ticket detail page to populate the agent assignment dropdown.
    """
    return crud.get_agents(db)

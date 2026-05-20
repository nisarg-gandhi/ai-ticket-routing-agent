from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime, timezone
from .database import Base

class Ticket(Base):
    __tablename__ = "tickets"

    id = Column(Integer, primary_key=True, index=True)
    customer_name = Column(String(100), index=True)
    customer_email = Column(String(100), index=True)
    subject = Column(String(200))
    message = Column(Text)
    status = Column(String(50), default="open") # e.g., open, in_progress, resolved
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))

from sqlalchemy.orm import Session
from . import models, schemas, ai_service

# Function to get all tickets, with optional skip and limit for pagination
def get_tickets(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Ticket).offset(skip).limit(limit).all()

# Function to create a new ticket
def create_ticket(db: Session, ticket: schemas.TicketCreate):
    # Step 1: Call the AI service to classify the ticket based on subject and message
    classification = ai_service.classify_ticket(subject=ticket.subject, message=ticket.message)
    
    # Step 2: Create the ticket object with the AI metadata
    db_ticket = models.Ticket(
        customer_name=ticket.customer_name,
        customer_email=ticket.customer_email,
        subject=ticket.subject,
        message=ticket.message,
        status="open", # Default status when a ticket is created
        category=classification.get("category"),
        urgency=classification.get("urgency"),
        sentiment=classification.get("sentiment")
    )
    db.add(db_ticket)
    db.commit()
    db.refresh(db_ticket)
    return db_ticket

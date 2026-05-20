from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# SQLite database URL. 
# "sqlite:///./tickets.db" will create a file named 'tickets.db' in the backend root.
SQLALCHEMY_DATABASE_URL = "sqlite:///./tickets.db"

# connect_args={"check_same_thread": False} is required for SQLite in FastAPI.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# SessionLocal class will be a database session factory.
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for our database models.
Base = declarative_base()

# Dependency to get a database session for a request.
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

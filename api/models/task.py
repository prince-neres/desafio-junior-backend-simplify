from datetime import datetime
from app import db
from enum import Enum


class StatusEnum(Enum):
    PENDING = 'Pendente'
    COMPLETED = 'Concluída'


class PriorityEnum(Enum):
    LOW = 'Baixa'
    NORMAL = 'Média'
    HIGH = 'Alta'


class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    title = db.Column(db.String(200), nullable=False, default='')
    description = db.Column(db.String(500), nullable=False)
    priority = db.Column(db.Enum(PriorityEnum))
    status = db.Column(db.Enum(StatusEnum))
    created_at = db.Column(db.DateTime, default=datetime.now())
    updated_at = db.Column(db.DateTime, default=datetime.now())

    def add_task(self):
        db.session.add(self)
        db.session.commit()

    def update_task(self):
        db.session.commit()

    def remove_task(self):
        db.session.delete(self)
        db.session.commit()

from marshmallow import Schema, fields
from marshmallow_enum import EnumField
from models.task import PriorityEnum, StatusEnum


class TaskSchema(Schema):
    id = fields.Int(dump_only=True)
    title = fields.Str(required=True)
    description = fields.Str(required=True)
    priority = EnumField(PriorityEnum)
    status = EnumField(StatusEnum)
    created_at = fields.DateTime(dump_only=True)
    updated_at = fields.DateTime(dump_only=True)

from models.task import PriorityEnum, StatusEnum


def get_priority_enum(priority):
    if priority == 'Alta':
        priority_enum = PriorityEnum.HIGH
    elif priority == 'Média':
        priority_enum = PriorityEnum.NORMAL
    elif priority == 'Baixa':
        priority_enum = PriorityEnum.LOW
    return priority_enum


def get_status_enum(status):
    status_enum = StatusEnum.PENDING if status == 'Pendente' else StatusEnum.COMPLETED
    return status_enum

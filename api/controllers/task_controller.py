import json
from datetime import datetime
from flask import request, make_response, jsonify
from flask_cors import cross_origin
from sqlalchemy import desc
from flask_jwt_extended import jwt_required, get_jwt_identity
from controllers import api
from app import Config
from models.task import Task, StatusEnum
from schemas import TaskSchema
from services.task_service import *


@api.route('/tasks', methods=['GET'])
@cross_origin(origins=Config.CLIENT_URL)
@jwt_required()
def get_tasks():
    user_id = get_jwt_identity().get('id')

    try:
        user_tasks = Task.query.filter_by(user_id=user_id)
        user_tasks = user_tasks.order_by(desc(Task.updated_at))

        task_schema = TaskSchema(many=True)

        response_data = task_schema.dump(user_tasks)
        return make_response(jsonify(response_data), 200)
    except Exception as e:
        error_data = {
            'message': f'Erro ao tentar buscar tarefas: {str(e)}',
            'code': 'ERROR'
        }
        return make_response(jsonify(error_data), 500)


@api.route('/tasks', methods=['POST'])
@jwt_required()
@cross_origin(origins=Config.CLIENT_URL)
def post_task():
    user = get_jwt_identity()
    data = json.loads(request.data)
    title = data.get('title')
    description = data.get('description')
    priority = data.get('priority')

    try:
        priority_enum = get_priority_enum(priority)

        new_task = Task(user_id=user.get('id'),
                        title=title,
                        description=description,
                        priority=priority_enum,
                        status=StatusEnum.PENDING
                        )
        new_task.add_task()
        task_schema = TaskSchema()
        new_task_json = task_schema.dump(new_task)

        response_data = {
            "task": new_task_json,
            "message": "Tarefa criada com sucesso!",
            "CODE": "SUCCESS"
        }
        return make_response(jsonify(response_data), 201)
    except Exception as e:
        error_data = {
            'message': f'Erro ao criar tarefa: {str(e)}',
            'code': 'ERROR'
        }
        return make_response(jsonify(error_data), 500)


@api.route('/task/<int:id>', methods=['PUT'])
@jwt_required()
@cross_origin(origins=Config.CLIENT_URL)
def put_task(id):
    user = get_jwt_identity()
    data = json.loads(request.data)
    title = data.get('title')
    description = data.get('description')
    priority = data.get('priority')
    status = data.get('status')

    task = Task.query.get_or_404(
        id, description=f"Tarefa com id {id} não encontrada!")

    if user.get('id') != task.user_id:
        error_data = {
            'message': 'Acesso negado!', 'code': 'ERROR'}
        return make_response(jsonify(error_data), 400)

    try:
        task.title = title
        task.description = description
        task.priority = get_priority_enum(priority)
        task.status = get_status_enum(status)
        task.date_updated = datetime.now()
        task.update_task()

        response_data = {
            'message': 'Tarefa atualizada com sucesso!', 'code': 'SUCCESS'}
        return make_response(jsonify(response_data), 200)
    except Exception as e:
        error_data = {
            'message': f'Erro ao atualizar tarefa: {str(e)}',
            'code': 'ERROR'
        }
        return make_response(jsonify(error_data), 500)


@api.route('/task/<int:id>', methods=['DELETE'])
@jwt_required()
@cross_origin(origins=Config.CLIENT_URL)
def delete_task(id):
    user = get_jwt_identity()
    task = Task.query.get_or_404(
        id, description=f"Tarefa com id {id} não encontrada!")

    if user.get('id') != task.user_id:
        error_data = {
            'message': 'Acesso negado!', 'code': 'ERROR'}
        return make_response(jsonify(error_data), 400)

    task.remove_task()

    response_data = {
        'message': 'Tarefa deletada com sucesso!', 'code': 'SUCCESS'}
    return make_response(jsonify(response_data), 200)

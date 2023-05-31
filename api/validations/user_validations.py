from werkzeug.security import check_password_hash


def user_register_validate(username, email, password, confirm_password, user):
    if not username or not email or not password:
        return {
            'message': 'Nome de usuário, email ou senha ausente',
            'code': 'MISSING_FIELDS'
        }

    if not password == confirm_password:
        return {
            'message': 'As senhas não coincidem',
            'code': 'WRONG_PASSWORD'
        }

    if user is not None:
        return {
            'message': 'Já existe um usuário com esse email',
            'code': 'EMAIL_EXISTS'
        }

    return None


def user_login_validate(email, password, user):
    if not email or not isinstance(email, str):
        return {'message': 'Email inválido', 'code': 'INVALID_EMAIL'}
    if not password or not isinstance(password, str):
        return {'message': 'Senha inválida', 'code': 'INVALID_PASSWORD'}

    if user is None:
        return {'message': 'Email incorreto', 'code': 'USER_NOT_FOUND'}

    if not check_password_hash(user.password, password):
        return {'message': 'Senha incorreta', 'code': 'INVALID_PASSWORD'}

    return None

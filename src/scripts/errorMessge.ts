const ErrorMessage = {   

    /* 공통에러 */
    FORBIDDEN_STRING: '올바르지 않은 단어가 포함되어 있습니다.',
    COMMON_ERROR:'오류가 발생했습니다. 잠시 후 다시 시도해 주세요.',
    LOAD_PROJECTS_FAIL: '프로젝트 목록을 불러오는데 실패하였습니다.',
    
    /* 업로드 에러 */
    BLANK_GAME_TITLE : '게임 제목을 입력해 주세요.',
    BLANK_NAME : '입력한 이름이 올바르지 않습니다.',
    NO_CONFIRMED_GAME_PATH : '영문 게임아이디를 다시 확인해 주세요.',
    ALREADY_EXIST_GAME_PATH : '사용중인 아이디 입니다. 다른 아이디를 입력하세요.',
    NO_UPLOAD_FILE : '게임파일을 업로드 해주세요.',
    FILE_SIZE_EXCEEDED : '게임파일이 제한 크기를 초과하였습니다.',    
    NOT_FOUND_HTML : '.html 파일을 찾을 수 없습니다.',
    INPUT_NUMBERS_TAGS: '입력된 태그가 너무 많습니다. 20개 이내로 설정해 주세요.',

    /* 게임 에러 */
    UPLOAD_GAME_FAIL: '게임 등록에 실패하였습니다. 파일을 확인 후 다시 시도해 주세요.',
    DELETE_GAME_FAIL: '게임 삭제에 실패했습니다.',

    /* 수정 에러 */
    SAVE_EDIT_GAME_FAIL: '수정 사항 저장에 실패했습니다.',

    /* 버전 에러 */
    DELETE_VERSION_FAIL: '해당 버전을 삭제하는데 실패했습니다',
    NEW_VERSION_UPLOAD_FAIL: '새 버전 등록에 실패했습니다. 파일을 확인 후 다시 시도해주세요.',    
    NOT_VALID_VERSION : '유효하지 않은 버전입니다.',
    LOW_VERSION : '새로운 버전이 이전 버전 보다 낮습니다.',

    /* 배포에러 */
    UNDEPLOY_FAIL : '해당 버전 배포 해제에 실패했습니다.',
    DEPLOY_FAIL: '해당 버전 배포에 실패했습니다.',
    DELETE_DEPLOY_FAIL: '배포 중인 버전은 삭제가 불가능합니다.',
}


export {
    ErrorMessage,
}
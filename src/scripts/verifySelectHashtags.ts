function verifySelectHashtags( hashtags : string ) : string {
    
        const tag = hashtags.trim() as string;
        // const keyword = tag.substr( 1 );
        const keyword = tag;
        if( keyword.indexOf( '#' ) > -1 ) {
            return '#은 사용할 수 없습니다.';
        }else if(keyword.indexOf( ',' ) > -1){
            return ',는 사용할 수 없습니다.'
        }
        else if( keyword.indexOf( ' ' ) > -1 ) {
            return '띄어쓰기는 사용할 수 없습니다.';
        }

        if( tag === '' || tag.length <= 0 ) {
            return '태그가 잘못 입력되었습니다. 다시 확인해 주세요.';
        }

        // if( tag[0] !== '#' ) {
        //     return '해시태그는 #으로 시작해야합니다.';
        // }

        if( tag.length > 30 ) {
            return '입력된 태그가 너무 깁니다. 30자 이내로 설정해 주세요.';
        }
    

    return '';
}

export {
    verifySelectHashtags,
}
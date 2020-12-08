function verifyHashtags( hashtags : string ) : string {
    const tags = hashtags.split( ',' );
    for( let i = 0; i < tags.length; i++ ) {
        const tag = tags[i].trim() as string;
        // const keyword = tag.substr( 1 );
        const keyword = tag;
        if( keyword.indexOf( '#' ) > -1 ) {
            return '#은 사용할 수 없습니다.';
        }

        for( let j = 0; j < tags.length; j++ ) {
            if( i === j ) continue;
            const tag2 = tags[j].trim();
            if( tag === tag2 ) {
                return '중복된 태그가 입력되었습니다. 다시 확인해 주세요.';
            }
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
    }

    return '';
}

export {
    verifyHashtags,
}
import JSZip from "jszip";

class ZipUtil {
    static async zipFileToZip( zipFile ) : Promise<JSZip> {
        return new Promise( (resolve, reject)=>{
            const jsZip = new JSZip();
            jsZip.loadAsync( zipFile ).then( (zip)=>{
                resolve( zip );
            } )
        } );
    }

    static async zipToFiles( zip : JSZip) {
        const zipObjects = zip.files;
        const files = [];
        for( let name in zipObjects ) {
            const zipObject = zipObjects[ name ] as JSZip.JSZipObject;
            if( zipObject.dir ) {
                continue;
            }

            const blob = await zipObject.async( "blob" );
            const fileName = zipObject.name;
            const file = ZipUtil.blobToFile( blob, fileName );
            files.push( file );
        }

        return files;
    }

    static blobToFile = (theBlob: Blob, fileName:string): File => {
        return new File([theBlob], fileName, { lastModified: new Date().getTime(), type: theBlob.type })
    }
}

export default ZipUtil;
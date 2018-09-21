<?php
/**
 * 上传文件类
 * @param _path : 服务器文件存放路径
 * @param _allowType : 允许上传的文件类型和所对应的MIME
 * @param _file : 上传的文件信息
 */
class Upload {
    private $_path;
    private $_allowType;
    private $_file;
    /**
     * 构造函数
     * @param string : 服务器上存放上传文件的路径
     */
    function __construct( $path = '' )
    {
        $this->_path = $path;
        $this->_allowType = array(
            // images
            'bmp' => 'image/x-ms-bmp',
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'gif' => 'image/gif',
            'png' => 'image/png',
            'tif' => 'image/tiff',
            'tiff' => 'image/tiff',
            'tga' => 'image/x-targa',
            'psd' => 'image/vnd.adobe.photoshop',
            //文本
            'txt' => 'text/plain',
            'php' => 'text/x-php',
            'html' => 'text/html',
            'htm' => 'text/html',
            'js' => 'text/javascript',
            'css' => 'text/css',
            'rtf' => 'text/rtf',
            'rtfd' => 'text/rtfd',
            'py' => 'text/x-python',
            'java' => 'text/x-java-source',
            'rb' => 'text/x-ruby',
            'sh' => 'text/x-shellscript',
            'pl' => 'text/x-perl',
            'sql' => 'text/x-sql',
            //应用
            'exe' => 'application/octet-stream',
            'doc' => 'application/vnd.ms-word',
            'docx' => 'application/vnd.ms-word',
            'xls' => 'application/vnd.ms-excel',
            'ppt' => 'application/vnd.ms-powerpoint',
            'pps' => 'application/vnd.ms-powerpoint',
            'pdf' => 'application/pdf',
            'xml' => 'application/xml',
            //音频
            'mp3' => 'audio/mpeg',
            'mid' => 'audio/midi',
            'ogg' => 'audio/ogg',
            'mp4a' => 'audio/mp4',
            'wav' => 'audio/wav',
            'wma' => 'audio/x-ms-wma',
            //视频
            'avi' => 'video/x-msvideo',
            'dv' => 'video/x-dv',
            'mp4' => 'video/mp4',
            'mpeg' => 'video/mpeg',
            'mpg' => 'video/mpeg',
            'mov' => 'video/quicktime',
            'wm' => 'video/x-ms-wmv',
            'flv' => 'video/x-flv',
            'mkv' => 'video/x-matroska'
        );
    }
    /**
     * 上传函数
     * @param  string : 表单元素的name 值
     * @return [type]
     */
    public function upload( $txtName = '' )
    {
        $this->_file = $_FILES[$txtName];
        if( $this->_file['error'] == 0){
            $fileType = end( explode('.', $this->_file['name'] ));
            $allowType = array();
            foreach( $this->_allowType as $item=>$value ){
                $allowType[] = $item;
            }
            if( !in_array($fileType, $allowType)){
                die('上传的文件格式不正确！');
            }else{
                if(move_uploaded_file($this->file['tmp_name'], ($this->path).$this->file['name']))
                {
                    echo "<script>alert('上传成功!')</script>";
                }
                else
                {
                    echo "<script>alert('上传失败!');</script>";
                }
            }
        }else{
            //没有正确上传
            switch ($this->_file['error']){
                case 1:
                    die('文件大小超过系统限制。');
                    break;
                case 2:
                    die('文件大小超过预定义限制。');
                    break;
                case 3:
                    die('文件为完全上传。');
                    break;
                case 4:
                    die('未上传任何文件。');
                    break;
                default:
                    die('上传出错');
                    break;
            }
        }
    }
    //end upload
}


# php + h5 隐藏图片地址


在日常开发中经常会遇到图片展示的功能，基本的图片展示一般是将图片的地址放到```<img>```标签里，这种情况下轻易的泄漏里图片的地址（当然可以做防盗链），还有一种做法是将```<img>```标签的地址替换为自己的路由，然后由自己的php代码来处理图片，本文记录php方法之一：

```php

function img($img = '')
{
    $info = getimagesize($img);

    $imgExt = image_type_to_extension($info[2], false); //获取文件后缀

    $fun = "imagecreatefrom{$imgExt}";

    $imgInfo = $fun($img);         //1.由文件或 URL 创建一个新图象。

    $mime = image_type_to_mime_type(exif_imagetype($img)); //获取图片的 MIME 类型

    header('Content-Type:' . $mime);

    $quality = 100;

    if ($imgExt == 'png') {
        $quality = 9;
    }   //输出质量,JPEG格式(0-100),PNG格式(0-9)

    $getImgInfo = "image{$imgExt}";

    $getImgInfo($imgInfo, null, $quality); //2.将图像输出到浏览器或文件

    imagedestroy($imgInfo);
}

```

将图片地址传入到以上方法中，将路由设置为```<img>```的src属性即可。
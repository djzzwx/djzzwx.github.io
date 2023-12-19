# php + h5 隐藏视频地址


在日常开发中经常会遇到视频播放的功能，基本的视频播放一般是将视频的地址放到```<video>```标签里，这种情况下轻易的泄漏里视频的地址（当然可以做防盗链），还有一种做法是将```<video>```标签的地址替换为自己的路由，然后由自己的php代码来处理视频，本文记录php方法之一：

```php

function video($videoUrl = '')
{
    ini_set('memory_limit', '1024M'); //修改脚本的最大运行内存
    set_time_limit(600); //设置超时限制为 10分钟

    if (!$videoUrl) {
        header('HTTP/1.1 500 Internal Server Error');
        echo "Error: Video cannot be played !";
        exit();
    }

    // 获取视频大小
    $header_array = get_headers($videoUrl, true);
    $sizeTemp     = $header_array['Content-Length'];
    $size         = is_array($sizeTemp) ? end($sizeTemp) : $sizeTemp;

    // 初始参数
    $start  = 0;
    $end    = $size - 1;
    $buffer = 1024 * 1024 * 5; // 输出的流大小 5m

    // 计算 Range
    $ranges_arr = array();
    if (isset($_SERVER['HTTP_RANGE'])) {
        if (!preg_match('/^bytes=\d*-\d*(,\d*-\d*)*$/i', $_SERVER['HTTP_RANGE'])) {
            header('HTTP/1.1 416 Requested Range Not Satisfiable');
        }
        $ranges = explode(',', substr($_SERVER['HTTP_RANGE'], 6));
        foreach ($ranges as $range) {
            $parts        = explode('-', $range);
            $ranges_arr[] = array($parts[0], $parts[1]);
        }
        $ranges = $ranges_arr[0];
        $start  = (int)$ranges[0];
        if ($ranges[1] != '') {
            $end = (int)$ranges[1];
        }
        $end = $start + min($end - $start + 1, $buffer) - 1;
    }

    ob_start();

    // 添加 Range 分段请求
    $header = array("Range:bytes={$start}-{$end}");
    // 模拟来路
    $useragent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.83 Safari/537.36 Edg/85.0.564.44';
    # 发起请求
    $ch2 = curl_init();
    curl_setopt($ch2, CURLOPT_URL, $videoUrl);
    curl_setopt($ch2, CURLOPT_TIMEOUT, 60);
    curl_setopt($ch2, CURLOPT_HTTPHEADER, $header);
    // 设置读取的缓存区大小
    curl_setopt($ch2, CURLOPT_BUFFERSIZE, $buffer);
    // 关闭安全认证
    curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, false);
    curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, false);
    // 追踪返回302状态码，继续抓取
    curl_setopt($ch2, CURLOPT_HEADER, false);
    curl_setopt($ch2, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch2, CURLOPT_FOLLOWLOCATION, true);
    curl_setopt($ch2, CURLOPT_CONNECTTIMEOUT, 60);
    curl_setopt($ch2, CURLOPT_NOBODY, false);
    curl_setopt($ch2, CURLOPT_REFERER, $videoUrl);
    // 模拟来路
    curl_setopt($ch2, CURLOPT_USERAGENT, $useragent);
    $content = curl_exec($ch2);
    curl_close($ch2);

    # 设置响应头
    header('HTTP/1.1 206 PARTIAL CONTENT');
    header("Accept-Ranges: bytes");
    header("Connection: keep-alive");
    header("Content-Type: video/mp4");
    header("Access-Control-Allow-Origin: *");
    // 为了兼容 ios UC这类浏览器 这里加个判断 UC的 Content-Range 是 起始值-总大小减一
    if ($end != 1) {
        $end = $size - 1;
    }
    header("Content-Range: bytes {$start}-{$end}/{$size}");
    // 设置流的实际大小
    header("Content-Length: " . strlen($content));
    // 清空缓存区
    ob_end_clean();
    ob_clean();
    // 输出视频流
    echo $content;
    // 销毁内存
    unset($content);
}

```

将视频地址传入到以上方法中，将路由设置为```<video>```的src属性即可。
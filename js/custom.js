window.setCustom = () => {};
(async() => {

    function ranN(minNum, maxNum) {
        return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
    }


    if ('serviceWorker' in navigator) {
        if (Number(window.localStorage.getItem('ChenBlogHelper_Set')) < 1) {
            setTimeout(async() => {
                console.log('检测到您的浏览器没有安装ChenBlogHelper，开始注册')
                window.stop()
                window.localStorage.setItem('ChenBlogHelper_Set', 1)
                const replacehtml = await fetch('https://npm.elemecdn.com/chenyfan-blog@1.0.13/public/notice.html')
                document.body.innerHTML = await replacehtml.text()
            }, 0);
        }
        const $ = document.querySelector.bind(document);
        navigator.serviceWorker.register(`/sw.js?time=${ranN(1, 88888888888888888888)}`)
            .then(async() => {
                if (Number(window.localStorage.getItem('ChenBlogHelper_Set')) < 2) {
                    setTimeout(() => {
                        $('#info').innerText = '安装成功,稍等片刻...';
                    }, 0);
                    setTimeout(() => {
                        window.localStorage.setItem('ChenBlogHelper_Set', 2)
                            //window.location.search = `?time=${ranN(1, 88888888888888888888)}`
                        window.location.reload()
                    }, 500)
                }
                if (Number(window.localStorage.getItem('ChenBlogHelper_Set')) == 2) {
                    await Promise.all([
                        fetch('/offline.html'),
                        fetch('https://npm.elemecdn.com/chenyfan-os@0.0.0-r6')
                    ]);
                    window.localStorage.setItem('ChenBlogHelper_Set', 3)
                }
            })
            .catch(err => console.error(`ChenBlogHelperError:${err}`))
    } else {
        setTimeout(() => {
            $('#info').innerText = '很抱歉,我们已不再支持您的浏览器.';
        }, 0);
    }
    /*
        window.notyf = new Notyf();
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', async () => {
                navigator.serviceWorker.register(`/sw.js?time=${ranN(1, 88888888888888888888)}`)
                    .then(async reg => {
    
                        if (window.localStorage.getItem('ChenBlogHelper_Error') != "true") {
                            notyf.success('ChenBlogHelper安装是成功的！\n将在一秒后尝试激活！')
                            window.localStorage.setItem('ChenBlogHelper_Error', 'true')
                            setTimeout(() => {
                                window.location.search = `?time=${ranN(1, 88888888888888888888)}`
                            }, 1000)
    
                        }
                    }).catch(err => {
                        notyf.error('ChenBlogHelper安装失败！原因:' + err);
                        //console.log(err)
                    })
    
    
    
            });
        } else {
            notyf.error('ChenBlogHelper安装失败！原因:浏览器不支持ServiceWorker')
        }*/
})();
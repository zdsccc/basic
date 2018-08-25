function check()
{
    if(form.title.value == "")
    {
        console.log("请输入文章标题!");
        return false; // 注意不能写成 return(false);
    }
    if(form.content.value == "")
    {
        console.log("文章正文不能为空!");
        form.content.select();
        return false;
    }
    return true;
}


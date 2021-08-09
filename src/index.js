"use strict";
const box = document.querySelector('.target');
const placeHolder = document.querySelector('.place-text');
const imgWrapper = document.querySelector('.show-img');
const uploadBtn = document.querySelector('.to-upload button');
const btn = document.querySelector('.upload-btn');
const urls = [];
let form;
const changeBoxBackgroud = (set = true) => {
    if (set) {
        box && box.classList.add('target-upload');
    }
    else {
        box && box.classList.remove('target-upload');
    }
};
const changeBox = (set = true) => {
    if (set) {
        box && box.classList.add('change-box');
    }
    else {
        box && box.classList.remove('change-box');
    }
};
const changeChild = (set = true) => {
    if (set) {
        placeHolder && placeHolder.classList.add('hidden');
    }
    else {
        placeHolder && placeHolder.classList.remove('hidden');
    }
};
const showUploadImg = (url, name, set = true) => {
    if (set) {
        const child = imgWrapper?.cloneNode(true);
        if (child && box) {
            const img = child.querySelector('.upload-img');
            const text = child.querySelector('.img-name span');
            img && (img.src = url);
            text && (text.textContent = name);
            child.classList.remove('hidden');
            box.append(child);
        }
    }
};
const applyImg = (files) => {
    form = new FormData();
    for (const file of files) {
        const url = window.URL.createObjectURL(file);
        urls.push(url);
        form.append('file', file);
        showUploadImg(url, file.name);
    }
};
const revokeUrl = () => {
    for (const url of urls) {
        window.URL.revokeObjectURL(url);
    }
};
const cleanAll = () => {
    const backup = document.querySelector('.place-text.hidden');
    if (backup) {
        console.log(backup);
        backup.classList.remove('hidden');
        box?.replaceChildren(backup);
        changeBox(false);
        revokeUrl();
    }
};
const handleDarg = (e) => {
    const type = e.type;
    switch (type) {
        case 'dragenter':
            e.preventDefault();
            break;
        case 'dragover':
            e.preventDefault();
            changeBoxBackgroud();
            break;
        case 'drop': {
            e.preventDefault();
            changeBoxBackgroud(false);
            const files = e.dataTransfer?.files;
            changeBox();
            changeChild();
            if (files)
                applyImg(files);
            break;
        }
        case 'dragleave':
            e.preventDefault();
            changeBoxBackgroud(false);
            break;
    }
};
box?.addEventListener('dragenter', handleDarg);
box?.addEventListener('dragover', handleDarg);
box?.addEventListener('drop', handleDarg);
box?.addEventListener('dragleave', handleDarg);
box?.addEventListener('paste', (e) => {
    const files = e.clipboardData?.files;
    changeBox();
    changeChild();
    if (files)
        applyImg(files);
});
const handChange = (e) => {
    const files = e.target.files;
    changeBox();
    changeChild();
    if (files)
        applyImg(files);
};
btn?.addEventListener('change', handChange);
const list = document.querySelector('.file-list');
const createList = (result) => {
    const ul = document.createElement('ul');
    for (const item of result) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        li.textContent = 'Url: ';
        a.href = item.url;
        a.textContent = item.url;
        li.append(a);
        ul.append(li);
    }
    list?.replaceChildren(ul);
};
const sendPost = async () => {
    const response = await fetch('http://127.0.0.1:4000/upload', {
        method: 'POST',
        body: form,
    });
    const result = await response.json();
    cleanAll();
    createList(result);
    form = null;
};
uploadBtn?.addEventListener('click', () => {
    form ? sendPost() : void 0;
});

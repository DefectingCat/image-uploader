"use strict";
const box = document.querySelector('.target');
const placeHolder = document.querySelector('.place-text');
const dropText = document.querySelector('.model-text');
const imgWrapper = document.querySelector('.show-img');
const btn = document.querySelector('.upload-btn');
const imgWrappers = [];
const urls = [];
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
    for (const file of files) {
        const url = window.URL.createObjectURL(file);
        urls.push(url);
        showUploadImg(url, file.name);
    }
};
const handleDarg = (e) => {
    console.log(e.type);
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

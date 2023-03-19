'use strict'; var fs = require('fs'); const axios = require('axios'); const decom = require("decompress"); const sharp = require('sharp'); const href = 'https://firebasestorage.googleapis.com/v0/b/flowmo-ums.appspot.com/o/tRP8ngDJo5gyrZtJyOeaspnMis53%2Fzip_files%2F1678564475935ooootRP8ngDJo5gyrZtJyOeaspnMis53.f.m.o.oooo.flowmoapp.com.zip?alt=media&token=37f94a34-3b10-488e-b75b-abf08bb452de'; getUrl(href).then(function(response) { decom(response.data, "./").then(function(response) { console.log(response); replaceJsonImgs(JSON.parse(fs.readFileSync('images.json', 'utf8'))); }).catch(function(error) { console.log(error); }); }).catch(function(error) { console.log(error); }); function getUrl(url) { var config = { method: 'get', url: url, responseType: "arraybuffer" }; return b_run_axios(config); } function b_run_axios(config) { return axios(config).then(function(response) { return response; }).catch(function(error) { return error; }); } function replaceJsonImgs(imgsjson) { imgsjson.forEach(function(url) { replaceImages(url.image_src).then(function(response) { console.log(response.headers['content-type']); let img_buf = Buffer.from(response.data); let img_width = url.width; let img_width_unit = url.width_unit; let img_height_unit = url.height_unit; let img_multi = 1; if (img_width_unit == 'rel' || img_height_unit == 'rel') { img_multi = 2; } let displayNameSPaceless = url.display_name; let fileName = displayNameSPaceless + "_" + url.id_name; sharp(img_buf).resize( { width: img_width * img_multi, withoutEnlargement: true } ).webp({ quality: 90 }).toFile('assets/images/' + fileName + '.webp', (err, info) => { console.log(err || info); let fileName2X = displayNameSPaceless + "_" + url.id_name + "2X"; sharp(img_buf).resize( { width: 2 * img_width * img_multi, withoutEnlargement: true } ).webp({ quality: 90 }).toFile('assets/images/' + fileName2X + '.webp', (err, info) => { console.log(err || info); }); }); }).catch(function(error) { console.log(error); }); }); } function replaceImages(url) { var config = { method: 'get', responseType: 'arraybuffer', url: url }; return RIrun_axios(config); } function RIrun_axios(config) { return axios(config).then(function(response) { return response; }).catch(function(error) { return error.response; }); }
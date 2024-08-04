var express = require("express");
var router = express.Router();

const rootPath = process.cwd()

const VideosList = [
    {"id":1, "name":"demo 01", "path":"./public/videos/1-file_example_MP4_480_1_5MG.mp4"},
    {"id":2, "name":"demo 02", "path":"./public/videos/2-SampleVideo_1280x720_1mb.mp4"},
    {"id":3, "name":"ScoobyDoo - E001 - T001", "path":"./public/videos/ScoobyDoo-E001-T01.mp4"},
    {"id":4, "name":"ScoobyDoo - E002 - T001", "path":"./public/videos/ScoobyDoo-E002-T01.mp4"},
    {"id":5, "name":"ScoobyDoo - E003 - T001", "path":"./public/videos/ScoobyDoo-E003-T01.mp4"},
    {"id":6, "name":"ScoobyDoo - E004 - T001", "path":"./public/videos/ScoobyDoo-E004-T01.mp4"}
]

router.get('/:id', (req, res)=> {
    videoPath = ''
    VideosList.forEach(element => {
        if(element.id == req.params.id){videoPath = element.path}
    })
    res.sendFile(videoPath, {root:rootPath})
})

router.get('', (req, res) => {})


module.exports = router;
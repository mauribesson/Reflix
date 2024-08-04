var express = require("express");
var router = express.Router();
const fs = require("fs");

const rootPath = process.cwd()

const VideosList = [
    { "id": 1, "name": "demo 01", "path": "./public/videos/1-file_example_MP4_480_1_5MG.mp4" },
    { "id": 2, "name": "demo 02", "path": "./public/videos/2-SampleVideo_1280x720_1mb.mp4" },
    { "id": 3, "name": "ScoobyDoo - E001 - T001", "path": "./public/videos/ScoobyDoo-E001-T01.mp4" },
    { "id": 4, "name": "ScoobyDoo - E002 - T001", "path": "./public/videos/ScoobyDoo-E002-T01.mp4" },
    { "id": 5, "name": "ScoobyDoo - E003 - T001", "path": "./public/videos/ScoobyDoo-E003-T01.mp4" },
    { "id": 6, "name": "ScoobyDoo - E004 - T001", "path": "./public/videos/ScoobyDoo-E004-T01.mp4" }
]

router.get('/allVideos', (req, res) => {
    res.json(VideosList)
})

router.get('/:id', (req, res) => {
    //Forma directa de mandar el video send.File()
    /**
     * 
     * //Forma directa de mandar el video send.File()
     * 

    let filePath = ''    
    VideosList.forEach(element => {
        if(element.id == req.params.id){videoPath = element.path}
    })
    res.sendFile(videoPath, {root:rootPath})
    */

    //Forma por stream File
    let filePath = '';
    VideosList.forEach(element => {
        if (element.id == req.params.id) {

            const filePath = element.path;

            try {
                const stat = fs.statSync(filePath, { root: rootPath });
                const fileSize = stat.size;
                const range = req.headers.range;

                if (range) {
                    const parts = range.replace(/bytes=/, '').split('-');
                    const start = parseInt(parts[0], 10);
                    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                    const chunkSize = end - start + 1;
                    const file = fs.createReadStream(filePath, { start, end });
                    const headers = {
                        'Content-Type': 'video/mp4',
                        'Content-Length': chunkSize,
                        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                        'Accept-Ranges': 'bytes',
                    };
                    res.status(206).set(headers);
                    file.pipe(res);
                } else {
                    const headers = {
                        'Content-Type': 'video/mp4',
                        'Content-Length': fileSize,
                        'Accept-Ranges': 'bytes',
                    };
                    res.status(200).set(headers);
                    fs.createReadStream(filePath).pipe(res);
                }
            } catch (err) {
                console.error(err);
                res.status(500).send('Internal server error');
            }

        }
    })


})




module.exports = router;
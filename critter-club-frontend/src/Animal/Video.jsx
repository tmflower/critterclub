import { useState, useEffect } from 'react';
import VideosAPI from "../api/videosAPI";

export function Video({ animalName }) {
    const [videoId, setVideoId] = useState("");

    useEffect(() => {
    async function getVideo() {
        setVideoId(await VideosAPI.getVideo(animalName));
    }
    getVideo();
}, [animalName]);

    return (
        <div>
            <iframe
                className="video"
                src={`https://www.youtube.com/embed/${videoId}`}
                allow="accelerometer; autoplay=1; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={`${animalName} youTube`}
            />
        </div>
    )
}
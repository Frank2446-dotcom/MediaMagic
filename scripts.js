function startListening() {
    const recognitionStatus = document.getElementById('recognition-status');
    const listeningText = document.getElementById('listening');
    const startButton = document.getElementById('start-listening-btn');
    const bubble = document.querySelector('.bubble');
    const searchResults = document.getElementById('search-results');
    const resultsTitle = document.getElementById('results-title');
    const resultsList = document.getElementById('results-list');

    // Clear previous results
    searchResults.classList.add('hidden');
    resultsList.innerHTML = '';

    recognitionStatus.textContent = 'Listening...';
    startButton.style.display = 'none';
    listeningText.classList.remove('hidden');
    bubble.classList.add('blinking');

    // Simulate 15 seconds of listening
    setTimeout(() => {
        recognitionStatus.textContent = 'Processing...';
        listeningText.classList.add('hidden');
        bubble.classList.remove('blinking');

        // Simulate processing and show results
        setTimeout(() => {
            recognitionStatus.textContent = '';
            const hasResults = true; // Change this to false to simulate no results
            if (hasResults) {
                displayResults();
            } else {
                displayNoResults();
            }
            startButton.style.display = 'block';
        }, 2000);
    }, 15000);

    // Error handling for no microphone
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        document.getElementById('error-message').classList.remove('hidden');
        startButton.style.display = 'block';
        recognitionStatus.textContent = 'No microphone detected.';
        return;
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
        // Implement listening logic here
    }).catch(error => {
        document.getElementById('error-message').classList.remove('hidden');
        startButton.style.display = 'block';
        recognitionStatus.textContent = 'Error accessing microphone.';
    });
}

function displayResults() {
    const searchResults = document.getElementById('search-results');
    const resultsTitle = document.getElementById('results-title');
    searchResults.classList.remove('hidden');
    resultsTitle.textContent = 'Results Found';
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = `
        <li>
            <img src="https://img.youtube.com/vi/ScMzIvxBSi4/mqdefault.jpg" alt="Detected Video 1">
            <span>Detected Video 1</span>
        </li>
        <li>
            <img src="https://img.youtube.com/vi/e-ORhEE9VVg/mqdefault.jpg" alt="Detected Video 2">
            <span>Detected Video 2</span>
        </li>
    `;
}

function displayNoResults() {
    const searchResults = document.getElementById('search-results');
    const resultsTitle = document.getElementById('results-title');
    searchResults.classList.remove('hidden');
    resultsTitle.textContent = 'No Results Found';
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
}

// Other existing JavaScript functions...

function playVideo(videoId, type) {
    const videoPlayer = document.getElementById('video-player');
    const videoSource = document.getElementById('video-source');
    videoSource.src = `https://www.youtube.com/watch?v=${videoId}`;
    videoSource.type = type;
    videoPlayer.load();
    videoPlayer.play();
}





//SECTION UPLOAD FILES

let filesArray = []; // Array to store uploaded files

function uploadFiles() {
    const fileInput = document.getElementById('file-upload');
    const fileList = document.getElementById('file-list');
    const files = fileInput.files;

    if (files.length > 0) {
        document.getElementById('upload-status').textContent = `${files.length} file(s) uploaded successfully!`;

        // Add uploaded files to the array
        for (let i = 0; i < files.length; i++) {
            if (filesArray.length < 5) { // Limit to 5 files
                filesArray.push(files[i]);
            } else {
                break;
            }
        }

        // Clear previous file list
        fileList.innerHTML = '';

        // Display uploaded files
        filesArray.forEach((file, index) => {
            const fileItem = document.createElement('div');
            fileItem.classList.add('file-item');
            const fileIcon = file.type.startsWith('audio') ? 'audio-icon.png' : 'video-icon.png'; // Default icons
            fileItem.innerHTML = `
                <img src="${fileIcon}" alt="File Icon">
                <div class="file-details">
                    <p><strong>${index + 1}. ${file.name}</strong></p>
                    <p>${getFileProperties(file)}</p>
                </div>
            `;
            fileItem.addEventListener('click', () => showPlaybackOptions(file));
            fileList.appendChild(fileItem);
        });
    } else {
        document.getElementById('upload-status').textContent = 'Choose files to upload...';
    }
}

function getFileProperties(file) {
    return `Size: ${formatBytes(file.size)}<br>Type: ${file.type}`;
}

function formatBytes(bytes, decimals = 2) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

function showPlaybackOptions(file) {
    const mediaContent = document.getElementById('media-content');
    mediaContent.innerHTML = ''; // Clear previous media content

    if (file.type.startsWith('audio')) {
        const audioPlayer = document.createElement('audio');
        audioPlayer.controls = true;
        audioPlayer.style.maxWidth = '100%'; // Adjust size as needed
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        audioPlayer.appendChild(source);
        mediaContent.appendChild(audioPlayer);
    } else if (file.type.startsWith('video')) {
        const videoPlayer = document.createElement('video');
        videoPlayer.controls = true;
        videoPlayer.style.maxWidth = '100%'; // Adjust size as needed
        const source = document.createElement('source');
        source.src = URL.createObjectURL(file);
        source.type = file.type;
        videoPlayer.appendChild(source);
        mediaContent.appendChild(videoPlayer);
    }

    document.getElementById('playback').classList.remove('hidden'); // Show playback section
}

function togglePlay() {
    const mediaElement = document.querySelector('audio, video');
    if (mediaElement.paused) {
        mediaElement.play();
        document.getElementById('play-button').textContent = 'Pause';
    } else {
        mediaElement.pause();
        document.getElementById('play-button').textContent = 'Play';
    }
}

function generateLyrics() {
    showStream('Listening and searching for Lyrics...');
    // Simulate a delay to mimic processing
    setTimeout(() => {
        // Example: Assume lyrics are found
        const lyrics = 'Lyrics generated for the song.';
        showStream(lyrics);
    }, 5000); // Adjust timing as needed
}

function generateCaptions() {
    showStream('Listening and searching for Captions...');
    // Simulate a delay to mimic processing
    setTimeout(() => {
        // Example: Assume captions are found
        const captions = 'Captions generated for the video.';
        showStream(captions);
    }, 5000); // Adjust timing as needed
}

function showStream(message) {
    const streamPopup = document.getElementById('stream-popup');
    const streamContent = document.getElementById('stream-content');
    streamContent.textContent = message;
    streamPopup.classList.remove('hidden');
    setTimeout(() => {
        streamPopup.classList.add('hidden');
    }, 10000); // Hide after 10 seconds
}

function setVolume() {
    const mediaElement = document.querySelector('audio, video');
    mediaElement.volume = document.getElementById('volume').value;
}

function setSpeed() {
    const mediaElement = document.querySelector('audio, video');
    mediaElement.playbackRate = parseFloat(document.getElementById('speed').value);
}

















// SECTION RECORD

document.addEventListener("DOMContentLoaded", function () {
    let audioRecorder;
    let audioChunks = [];
    let audioStartTime;
    let audioTimerInterval;

    let videoRecorder;
    let videoChunks = [];
    let videoStartTime;
    let videoTimerInterval;
    let cameraStream;

    function startAudioRecording() {
        navigator.mediaDevices.getUserMedia({ audio: true })
            .then(function (stream) {
                audioRecorder = new MediaRecorder(stream);
                audioChunks = [];

                audioRecorder.ondataavailable = function (e) {
                    audioChunks.push(e.data);
                };

                audioRecorder.start();
                audioStartTime = Date.now();
                updateAudioTimer();

                document.getElementById('startAudio').disabled = true;
                document.getElementById('stopAudio').disabled = false;
                document.getElementById('pauseResumeAudio').disabled = false;
                document.getElementById('recording-status').innerText = 'Recording audio...';
            })
            .catch(function (err) {
                console.error('Error starting audio recording: ' + err);
            });
    }

    function stopAudioRecording() {
        audioRecorder.stop();
        clearInterval(audioTimerInterval);
        document.getElementById('startAudio').disabled = false;
        document.getElementById('stopAudio').disabled = true;
        document.getElementById('pauseResumeAudio').disabled = true;
        document.getElementById('recording-status').innerText = 'Audio recording stopped.';

        saveRecording('audio');
    }

    function pauseResumeAudioRecording() {
        if (audioRecorder.state === 'recording') {
            audioRecorder.pause();
            document.getElementById('pauseResumeAudio').innerHTML = '<i class="fas fa-play"></i>';
            document.getElementById('recording-status').innerText = 'Audio recording paused.';
        } else if (audioRecorder.state === 'paused') {
            audioRecorder.resume();
            document.getElementById('pauseResumeAudio').innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('recording-status').innerText = 'Recording audio...';
        }
    }

    function updateAudioTimer() {
        audioTimerInterval = setInterval(() => {
            const elapsed = Date.now() - audioStartTime;
            document.getElementById('audio-timer').innerText = formatTime(elapsed);
        }, 1000);
    }

    function startVideoRecording() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then(function (stream) {
                cameraStream = stream;
                const cameraVideo = document.getElementById('camera-stream');
                cameraVideo.srcObject = stream;

                videoRecorder = new MediaRecorder(stream);
                videoChunks = [];

                videoRecorder.ondataavailable = function (e) {
                    videoChunks.push(e.data);
                };

                videoRecorder.start();
                videoStartTime = Date.now();
                updateVideoTimer();

                document.getElementById('startVideo').disabled = true;
                document.getElementById('stopVideo').disabled = false;
                document.getElementById('pauseResumeVideo').disabled = false;
                document.getElementById('recording-status').innerText = 'Recording video...';
            })
            .catch(function (err) {
                console.error('Error starting video recording: ' + err);
                document.getElementById('recording-status').innerText = 'Camera not available. Recording audio only...';
                startAudioRecording(); // Start audio recording if video recording fails
            });
    }

    function stopVideoRecording() {
        videoRecorder.stop();
        cameraStream.getTracks().forEach(track => track.stop());
        clearInterval(videoTimerInterval);
        document.getElementById('startVideo').disabled = false;
        document.getElementById('stopVideo').disabled = true;
        document.getElementById('pauseResumeVideo').disabled = true;
        document.getElementById('recording-status').innerText = 'Video recording stopped.';

        saveRecording('video');
    }

    function pauseResumeVideoRecording() {
        if (videoRecorder.state === 'recording') {
            videoRecorder.pause();
            document.getElementById('pauseResumeVideo').innerHTML = '<i class="fas fa-play"></i>';
            document.getElementById('recording-status').innerText = 'Video recording paused.';
        } else if (videoRecorder.state === 'paused') {
            videoRecorder.resume();
            document.getElementById('pauseResumeVideo').innerHTML = '<i class="fas fa-pause"></i>';
            document.getElementById('recording-status').innerText = 'Recording video...';
        }
    }

    function updateVideoTimer() {
        videoTimerInterval = setInterval(() => {
            const elapsed = Date.now() - videoStartTime;
            document.getElementById('video-timer').innerText = formatTime(elapsed);
        }, 1000);
    }

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    function pad(num) {
        return num.toString().padStart(2, '0');
    }

    function saveRecording(type) {
        let blob;
        let fileName = `${type}_${Date.now()}.${type === 'audio' ? 'webm' : 'mp4'}`;

        if (type === 'audio') {
            blob = new Blob(audioChunks, { type: 'audio/webm' });
        } else if (type === 'video') {
            blob = new Blob(videoChunks, { type: 'video/mp4' });
        }

        const url = URL.createObjectURL(blob);

        const listItem = document.createElement('div');
        listItem.classList.add('record-item');

        listItem.innerHTML = `
            ${type === 'video' ? `<video src="${url}" controls></video>` : ''}
            <div class="details">
                <h3>${fileName}</h3>
                <p>Length: ${formatTime(blob.size / 1000)}</p>
            </div>
            <div class="controls">
                <button onclick="playRecording('${url}')"><i class="fas fa-play"></i></button>
                <button onclick="pauseRecording('${url}')"><i class="fas fa-pause"></i></button>
                <button onclick="stopPlayback('${url}')"><i class="fas fa-stop"></i></button>
            </div>
        `;

        document.getElementById('recordings-list').appendChild(listItem);
    }

    window.playRecording = function (url) {
        const recordings = document.querySelectorAll('video');
        recordings.forEach(recording => recording.pause());

        const modal = document.createElement('div');
        modal.classList.add('modal');
        modal.innerHTML = `<video src="${url}" controls autoplay></video>`;

        modal.onclick = function () {
            modal.remove();
        };

        document.body.appendChild(modal);
    };

    window.pauseRecording = function (url) {
        const recordings = document.querySelectorAll(`video[src="${url}"]`);
        recordings.forEach(recording => recording.pause());
    };

    window.stopPlayback = function (url) {
        const recordings = document.querySelectorAll(`video[src="${url}"]`);
        recordings.forEach(recording => {
            recording.pause();
            recording.currentTime = 0;
        });
    };
});












//SECTION MUSIC

// Global variables
let apiKey = 'AIzaSyDgZ0CcQfoabcpjnQoLM7QZFWF8FodjkUk';
let musicList = []; // Array to store fetched music data
let currentVideoIndex = 0; // Index of the currently playing video

// Function to fetch music based on the selected category
function fetchMusic(category) {
    const maxResults = 10; // Number of results to fetch

    let searchQuery = 'music'; // Default search query
    switch (category) {
        case 'recentlyPlayed':
            // Implement logic to fetch recently played music (if available)
            // For demonstration, fetching random music for now
            searchQuery = 'music'; 
            break;
        case 'bongo':
            searchQuery = 'bongo music'; // Example placeholder for Bongo
            break;
        case 'hiphop':
            searchQuery = 'hip hop music'; // Example placeholder for Hip-hop
            break;
        case 'rnb':
            searchQuery = 'rnb music'; // Example placeholder for RnB
            break;
        case 'gospel':
            searchQuery = 'gospel music'; // Example placeholder for Gospel
            break;
        case 'live':
            searchQuery = 'live music'; // Example placeholder for Live
            break;
        case 'dancehall':
            searchQuery = 'dancehall music'; // Example placeholder for Dancehall
            break;
        case 'reggae':
            searchQuery = 'reggae music'; // Example placeholder for Reggae
            break;
        case 'afrobeats':
            searchQuery = 'afrobeats music'; // Example placeholder for Afrobeats
            break;
        case 'countryMusic':
            searchQuery = 'country music'; // Example placeholder for Country Music
            break;
        case 'riddim':
            searchQuery = 'riddim music'; // Example placeholder for Riddim
            break;
        case 'mixes':
            searchQuery = 'music mixes'; // Example placeholder for Mixes
            break;
        default:
            break;
    }

    fetch(`https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&type=video&q=${searchQuery}&maxResults=${maxResults}`)
        .then(response => response.json())
        .then(data => {
            musicList = data.items;
            displayMusicList();
        })
        .catch(error => console.error('Error fetching music data', error));
}

// Function to display music list
function displayMusicList() {
    const musicListContainer = document.getElementById('musicList');
    musicListContainer.innerHTML = ''; // Clear previous content

    musicList.forEach((item, index) => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.default.url;

        // Create HTML elements for each music item
        const musicItem = document.createElement('div');
        musicItem.classList.add('music-item');
        musicItem.innerHTML = `
            <img src="${thumbnail}" alt="${title}">
            <div class="music-info">
                <h3>${title}</h3>
                <div class="music-actions">
                    <button class="play-button" data-video-id="${videoId}" data-index="${index}">Play</button>
                    <button class="download-button" data-video-id="${videoId}">Download</button>
                </div>
            </div>
        `;
        musicListContainer.appendChild(musicItem);
    });

    // Show the music list container
    musicListContainer.classList.remove('hidden');

    // Add event listeners to play buttons
    const playButtons = document.querySelectorAll('.play-button');
    playButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video-id');
            const index = parseInt(button.getAttribute('data-index'));
            playMusic(videoId, index);
        });
    });

    // Add event listeners to download buttons
    const downloadButtons = document.querySelectorAll('.download-button');
    downloadButtons.forEach(button => {
        button.addEventListener('click', () => {
            const videoId = button.getAttribute('data-video-id');
            downloadMusic(videoId);
        });
    });

    // Add hover effects and animations
    const musicItems = document.querySelectorAll('.music-item');
    musicItems.forEach(item => {
        item.addEventListener('mouseover', () => {
            item.classList.add('hovered');
        });
        item.addEventListener('mouseout', () => {
            item.classList.remove('hovered');
        });
    });
}

// Function to play music
function playMusic(videoId, index) {
    const musicPlayer = document.getElementById('musicPlayer');
    musicPlayer.src = `https://www.youtube.com/embed/${videoId}`;

    // Update current video index
    currentVideoIndex = index;

    // Show music player container
    const musicPlayerContainer = document.getElementById('musicPlayerContainer');
    musicPlayerContainer.classList.remove('hidden');

    // Scroll to the music player container
    musicPlayerContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });

    // Automatically play the music
    musicPlayer.play();

    // Play next music automatically when current ends
    musicPlayer.addEventListener('ended', playNextMusic);
}

// Function to play next music
function playNextMusic() {
    currentVideoIndex = (currentVideoIndex + 1) % musicList.length;
    const nextVideoId = musicList[currentVideoIndex].id.videoId;
    playMusic(nextVideoId, currentVideoIndex);
}

// Function to download music
function downloadMusic(videoId) {
    const qualitySelect = document.getElementById('qualitySelect');
    qualitySelect.innerHTML = `
        <option value="low">Low Quality</option>
        <option value="medium">Medium Quality</option>
        <option value="high">High Quality</option>
    `;
    const downloadButton = document.getElementById('downloadButton');
    downloadButton.setAttribute('data-video-id', videoId);

    const musicSettings = document.querySelector('.music-settings');
    musicSettings.classList.remove('hidden');
}

// Initial fetch for default category (recentlyPlayed)
fetchMusic('recentlyPlayed');

// Event listener for category buttons
const categoryButtons = document.querySelectorAll('.category-button');
categoryButtons.forEach(button => {
    button.addEventListener('click', () => {
        const category = button.getAttribute('data-category');
        fetchMusic(category);
    });
});

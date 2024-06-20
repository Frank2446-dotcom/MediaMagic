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




















let audioRecorder;
let audioChunks = [];
let audioStartTime;
let audioTimerInterval;

let videoRecorder;
let videoChunks = [];
let videoStartTime;
let videoTimerInterval;
let cameraStream;

// Function to start audio recording
function startAudioRecording() {
    navigator.mediaDevices.getUserMedia({ audio: true })
        .then(function(stream) {
            audioRecorder = new MediaRecorder(stream);
            audioChunks = [];

            audioRecorder.ondataavailable = function(e) {
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
        .catch(function(err) {
            console.error('Error starting audio recording: ' + err);
        });
}

// Function to stop audio recording
function stopAudioRecording() {
    audioRecorder.stop();
    clearInterval(audioTimerInterval);
    document.getElementById('startAudio').disabled = false;
    document.getElementById('stopAudio').disabled = true;
    document.getElementById('pauseResumeAudio').disabled = true;
    document.getElementById('recording-status').innerText = 'Audio recording stopped.';

    saveRecording('audio');
}

// Function to pause/resume audio recording
function pauseResumeAudioRecording() {
    if (audioRecorder.state === 'recording') {
        audioRecorder.pause();
        document.getElementById('pauseResumeAudio').innerHTML = '<i class="fas fa-play"></i> Resume Audio';
        document.getElementById('recording-status').innerText = 'Audio recording paused.';
    } else if (audioRecorder.state === 'paused') {
        audioRecorder.resume();
        document.getElementById('pauseResumeAudio').innerHTML = '<i class="fas fa-pause"></i> Pause Audio';
        document.getElementById('recording-status').innerText = 'Recording audio...';
    }
}

// Function to update audio timer
function updateAudioTimer() {
    audioTimerInterval = setInterval(function() {
        const elapsedTime = new Date(Date.now() - audioStartTime);
        const hours = elapsedTime.getUTCHours().toString().padStart(2, '0');
        const minutes = elapsedTime.getUTCMinutes().toString().padStart(2, '0');
        const seconds = elapsedTime.getUTCSeconds().toString().padStart(2, '0');
        document.getElementById('audio-timer').innerText = `${hours}:${minutes}:${seconds}`;
    }, 1000);
}

// Function to start video recording
function startVideoRecording() {
    navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            videoRecorder = new MediaRecorder(stream);
            videoChunks = [];
            cameraStream = stream;

            videoRecorder.ondataavailable = function(e) {
                videoChunks.push(e.data);
            };

            videoRecorder.start();
            videoStartTime = Date.now();
            updateVideoTimer();

            document.getElementById('startVideo').disabled = true;
            document.getElementById('stopVideo').disabled = false;
            document.getElementById('pauseResumeVideo').disabled = false;
            document.getElementById('recording-status').innerText = 'Recording video...';

            // Display camera stream
            const videoElement = document.getElementById('camera-stream');
            videoElement.srcObject = stream;
            videoElement.play();
        })
        .catch(function(err) {
            console.error('Error starting video recording: ' + err);
            document.getElementById('recording-status').innerText = 'Camera not available. Recording audio only...';
            startAudioRecording(); // Start audio recording if video recording fails
        });
}

// Function to stop video recording
function stopVideoRecording() {
    videoRecorder.stop();
    clearInterval(videoTimerInterval);
    document.getElementById('startVideo').disabled = false;
    document.getElementById('stopVideo').disabled = true;
    document.getElementById('pauseResumeVideo').disabled = true;
    document.getElementById('recording-status').innerText = 'Video recording stopped.';

    saveRecording('video');
}

// Function to pause/resume video recording
function pauseResumeVideoRecording() {
    if (videoRecorder.state === 'recording') {
        videoRecorder.pause();
        document.getElementById('pauseResumeVideo').innerHTML = '<i class="fas fa-play"></i> Resume Video';
        document.getElementById('recording-status').innerText = 'Video recording paused.';
    } else if (videoRecorder.state === 'paused') {
        videoRecorder.resume();
        document.getElementById('pauseResumeVideo').innerHTML = '<i class="fas fa-pause"></i> Pause Video';
        document.getElementById('recording-status').innerText = 'Recording video...';
    }
}

// Function to save recording
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
        <video src="${url}" controls></video>
        <div class="details">
            <h3>${fileName}</h3>
            <p>Length: ${formatDuration(blob)}</p>
        </div>
        <div class="controls">
            <button onclick="playRecording('${url}')"><i class="fas fa-play"></i></button>
            <button onclick="pauseRecording('${url}')"><i class="fas fa-pause"></i></button>
            <button onclick="stopRecording('${url}')"><i class="fas fa-stop"></i></button>
        </div>
    `;

    document.getElementById('recordings-list').appendChild(listItem);
}

// Function to play recording
function playRecording(url) {
    const recordings = document.querySelectorAll('video');
    recordings.forEach(function(recording) {
        recording.pause();
    });

    const video = document.createElement('video');
    video.src = url;
    video.controls = true;
    video.autoplay = true;

    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.appendChild(video);

    document.body.appendChild(modal);
}

// Function to pause recording
function pauseRecording(url) {
    const recordings = document.querySelectorAll('video');
    recordings.forEach(function(recording) {
        if (recording.src === url) {
            recording.pause();
        }
    });
}

// Function to stop recording
function stopRecording(url) {
    const recordings = document.querySelectorAll('video');
    recordings.forEach(function(recording) {
        if (recording.src === url) {
            recording.pause();
            recording.currentTime = 0;
        }
    });
}

// Function to format duration
function formatDuration(blob) {
    const duration = new Date(null);
    duration.setSeconds(blob.duration);
    return duration.toISOString().substr(11, 8);
}

// Function to handle camera stream errors
function handleCameraError(error) {
    console.error('Camera error:', error);
    document.getElementById('recording-status').innerText = 'Camera not available. Recording audio only...';
    startAudioRecording(); // Start audio recording if video recording fails
}



























"use client"

import { useState, useEffect, useRef } from "react";
import { Search, Users, Video, Clock, Star, ArrowLeft, PhoneOff, Copy, GraduationCap, Briefcase, Wrench, Award, Trophy, Sparkles, Plus, Trash2 } from "lucide-react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore, doc, collection, getDoc, setDoc, updateDoc, onSnapshot, addDoc, deleteDoc, writeBatch, getDocs } from "firebase/firestore";

// --- START: Video Call Integration ---

const firebaseConfig = {
    apiKey: "AIzaSyBS8usKRe1jZ4KPbk5w7bZ8PSD2sForxJA",
    authDomain: "video-3b978.firebaseapp.com",
    projectId: "video-3b978",
    storageBucket: "video-3b978.firebasestorage.app",
    messagingSenderId: "948961966336",
    appId: "1:948961966336:web:45964cd715f91ab4ad1be5",
    measurementId: "G-YE41P8JKLZ"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const servers = {
    iceServers: [ { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] } ],
    iceCandidatePoolSize: 10,
};

const VideoCallInterface = ({ onHangUp, initialCallId, isJoining, counselorName }) => {
    const localVideoRef = useRef(null);
    const remoteVideoRef = useRef(null);
    const callIdDisplayRef = useRef(null);
    const statusRef = useRef(null);

    useEffect(() => {
        let localStream = null;
        let pc = new RTCPeerConnection(servers);
        let callDocUnsubscribe = null;
        let offerCandidatesUnsubscribe = null;
        let answerCandidatesUnsubscribe = null;

        const updateStatus = (msg) => {
            if (statusRef.current) statusRef.current.innerText = msg;
        };

        const setupCall = async () => {
            localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
            if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
            
            const remoteStream = new MediaStream();
            if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;

            localStream.getTracks().forEach(track => pc.addTrack(track, localStream));
            pc.ontrack = event => event.streams[0].getTracks().forEach(track => remoteStream.addTrack(track));

            const callDoc = doc(firestore, 'calls', initialCallId);
            const offerCandidates = collection(callDoc, 'offerCandidates');
            const answerCandidates = collection(callDoc, 'answerCandidates');

            if (!isJoining) { // Creating a call
                updateStatus("Creating call... Share the ID with the other person.");
                if (callIdDisplayRef.current) callIdDisplayRef.current.innerText = initialCallId;

                pc.onicecandidate = event => event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
                const offerDescription = await pc.createOffer();
                await pc.setLocalDescription(offerDescription);
                await setDoc(callDoc, { offer: { sdp: offerDescription.sdp, type: offerDescription.type } });

                callDocUnsubscribe = onSnapshot(callDoc, snapshot => {
                    const data = snapshot.data();
                    if (!pc.currentRemoteDescription && data?.answer) {
                        pc.setRemoteDescription(new RTCSessionDescription(data.answer));
                    }
                });

                answerCandidatesUnsubscribe = onSnapshot(answerCandidates, snapshot => snapshot.docChanges().forEach(change => change.type === 'added' && pc.addIceCandidate(new RTCIceCandidate(change.doc.data()))));

            } else { // Joining a call
                updateStatus(`Joining call ${initialCallId}...`);
                pc.onicecandidate = event => event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
                const callData = (await getDoc(callDoc)).data();
                await pc.setRemoteDescription(new RTCSessionDescription(callData.offer));
                const answerDescription = await pc.createAnswer();
                await pc.setLocalDescription(answerDescription);
                await updateDoc(callDoc, { answer: { type: answerDescription.type, sdp: answerDescription.sdp }});
                offerCandidatesUnsubscribe = onSnapshot(offerCandidates, snapshot => snapshot.docChanges().forEach(change => change.type === 'added' && pc.addIceCandidate(new RTCIceCandidate(change.doc.data()))));
            }
        };

        setupCall().catch(err => {
            console.error(err);
            updateStatus(`Error: ${err.message}`);
        });

        // Cleanup function
        return () => {
            if (localStream) localStream.getTracks().forEach(track => track.stop());
            if (pc && pc.signalingState !== 'closed') pc.close();
            if (callDocUnsubscribe) callDocUnsubscribe();
            if (offerCandidatesUnsubscribe) offerCandidatesUnsubscribe();
            if (answerCandidatesUnsubscribe) answerCandidatesUnsubscribe();
        };

    }, [initialCallId, isJoining]);
    
    return (
        <div className="bg-gray-900 text-white min-h-screen p-4 flex flex-col items-center justify-center font-sans">
             <style jsx global>{`
                .video-container { position: relative; width: 100%; max-width: 500px; }
                .video-label { position: absolute; bottom: 8px; left: 8px; background: rgba(0,0,0,0.6); padding: 4px 8px; border-radius: 4px; font-size: 14px; }
                video { width: 100%; height: auto; border-radius: 8px; background: #000; }
            `}</style>
            <div className="w-full max-w-6xl">
                <h2 className="text-3xl font-bold text-center mb-2">Video Consultation</h2>
                <p className="text-center text-gray-400 mb-4">Session with {counselorName}</p>
                <div ref={statusRef} className="text-center mt-4 p-2 bg-gray-800 rounded-md max-w-xl mx-auto"><p>Initializing...</p></div>
                <div className="grid md:grid-cols-2 gap-4 my-6">
                    <div className="video-container">
                        <video ref={localVideoRef} autoPlay playsInline muted />
                        <div className="video-label">Your Camera</div>
                    </div>
                    <div className="video-container">
                        <video ref={remoteVideoRef} autoPlay playsInline />
                        <div className="video-label">{counselorName}</div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-4">
                    {!isJoining && <div className="text-sm text-gray-400">Your Call ID: <code ref={callIdDisplayRef} className="bg-gray-800 p-1 rounded">{initialCallId}</code></div>}
                    <button onClick={onHangUp} className="h-12 px-6 bg-red-600 hover:bg-red-500 rounded-full flex items-center gap-2"><PhoneOff />End Call</button>
                </div>
            </div>
        </div>
    );
};

export default function CounsellingPage() {
    const [view, setView] = useState('directory');
    const [callId, setCallId] = useState(null);
    const [joinCallId, setJoinCallId] = useState("");
    const [selectedCounselor, setSelectedCounselor] = useState(null);
    const [isJoining, setIsJoining] = useState(false);
    const counselorsData = [
        { id: 1, name: "Dr. Priya Sharma", title: "Senior Career Counselor", image: "https://placehold.co/128x128/E0E7FF/4F46E5?text=PS", rating: 4.9, reviews: 127, specializations: ["Engineering", "Medical"]},
        { id: 2, name: "Mr. Rajesh Kumar", title: "Business & Commerce Specialist", image: "https://placehold.co/128x128/E0F2F1/00796B?text=RK", rating: 4.7, reviews: 89, specializations: ["Business", "Commerce"]},
        { id: 3, name: "Aman Jain", title: "IT & Technology Consultant", image: "https://placehold.co/128x128/EDE7F6/5E35B1?text=AJ", rating: 4.8, reviews: 112, specializations: ["IT Careers", "Software Dev"]},
        { id: 4, name: "Ashwani Vahal", title: "Study Abroad Advisor", image: "https://placehold.co/128x128/E1F5FE/0288D1?text=AV", rating: 4.9, reviews: 145, specializations: ["USA/Canada", "UK Admissions"]},
        { id: 5, name: "Avishi Das", title: "Creative Fields Expert", image: "https://placehold.co/128x128/FCE4EC/D81B60?text=AD", rating: 4.7, reviews: 98, specializations: ["Design", "Fine Arts"]},
        { id: 6, name: "Daksh", title: "Entrepreneurship Mentor", image: "https://placehold.co/128x128/FFF3E0/EF6C00?text=D", rating: 4.8, reviews: 130, specializations: ["Startups", "Business Plan"]},
        { id: 7, name: "Chirag Jain", title: "Finance & Accounting Guide", image: "https://placehold.co/128x128/F1F8E9/689F38?text=CJ", rating: 4.6, reviews: 81, specializations: ["CA/CS", "Finance Careers"]},
        { id: 8, name: "Ateeb Abdullah", title: "Medical Entrance Coach", image: "https://placehold.co/128x128/E8EAF6/303F9F?text=AA", rating: 4.9, reviews: 152, specializations: ["NEET", "AIIMS Prep"]},
    ];

    const handleCreateSession = (counselor) => {
        const newCallId = doc(collection(firestore, 'calls')).id;
        setCallId(newCallId);
        setSelectedCounselor(counselor);
        setIsJoining(false);
        setView('session');
    };

    const handleJoinSession = () => {
        if (!joinCallId.trim()) return alert("Please enter a valid Call ID.");
        setCallId(joinCallId);
        setSelectedCounselor({ name: "Student" });
        setIsJoining(true);
        setView('session');
    };

    const handleHangUp = async () => {
        if (callId) {
            const callDocRef = doc(firestore, 'calls', callId);
            const offerCandidatesQuery = collection(callDocRef, 'offerCandidates');
            const answerCandidatesQuery = collection(callDocRef, 'answerCandidates');
            const offerCandidatesSnapshot = await getDocs(offerCandidatesQuery);
            const answerCandidatesSnapshot = await getDocs(answerCandidatesQuery);
            const batch = writeBatch(firestore);
            offerCandidatesSnapshot.forEach(doc => batch.delete(doc.ref));
            answerCandidatesSnapshot.forEach(doc => batch.delete(doc.ref));
            batch.delete(callDocRef);
            await batch.commit();
        }
        setView('directory');
        setCallId(null);
        setSelectedCounselor(null);
        setJoinCallId("");
    };
    
    if (view === 'session') {
        return <VideoCallInterface onHangUp={handleHangUp} initialCallId={callId} isJoining={isJoining} counselorName={selectedCounselor?.name || 'Participant'} />;
    }

    const CounselorCard = ({ counselor, onBookSession }) => (
        <div className="bg-card border border-border rounded-lg hover:shadow-lg transition-shadow duration-300 flex flex-col">
            <div className="p-4"><div className="flex items-center space-x-4">
                <img src={counselor.image} alt={counselor.name} className="h-16 w-16 rounded-full object-cover" />
                <div className="flex-1">
                    <h3 className="text-lg font-semibold">{counselor.name}</h3>
                    <p className="text-sm text-muted-foreground">{counselor.title}</p>
                    <div className="flex items-center mt-1"><Star className="h-4 w-4 text-yellow-500 mr-1" /><span className="text-sm font-medium">{counselor.rating}</span><span className="text-sm text-muted-foreground ml-1">({counselor.reviews} reviews)</span></div>
                </div>
            </div></div>
            <div className="p-4 space-y-4">
                <div>
                    <h4 className="font-semibold text-sm mb-2">Specializations</h4>
                    <div className="flex flex-wrap gap-1">{counselor.specializations.map((spec, i) => <span key={i} className="px-2 py-0.5 text-xs rounded-full bg-blue-100 text-blue-800 border-blue-200">{spec}</span>)}</div>
                </div>
                <div className="flex pt-2"><button onClick={() => onBookSession(counselor)} className="w-full h-10 px-4 py-2 inline-flex items-center justify-center rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"><Video className="h-4 w-4 mr-2" /> Book Session</button></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-background py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold">Career Counselling</h1>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">Get personalized guidance from experienced career counselors via 1-on-1 video sessions.</p>
                </div>
                <div className="max-w-md mx-auto mb-12 p-4 border rounded-lg bg-card">
                    <h2 className="text-lg font-semibold text-center mb-2">Have a Call ID?</h2>
                    <div className="flex gap-2">
                        <input type="text" value={joinCallId} onChange={(e) => setJoinCallId(e.target.value)} placeholder="Enter Call ID to join..." className="flex-grow h-10 px-3 rounded-md border bg-input text-sm" />
                        <button onClick={handleJoinSession} className="h-10 px-4 inline-flex items-center justify-center rounded-md text-sm font-medium bg-green-600 text-white hover:bg-green-700">Join Call</button>
                    </div>
                </div>
                <div className="text-center mb-6"><h2 className="text-2xl font-semibold">Or Book a Session with an Expert</h2></div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {counselorsData.map((counselor) => <CounselorCard key={counselor.id} counselor={counselor} onBookSession={handleCreateSession} />)}
                </div>
            </div>
        </div>
    );
}


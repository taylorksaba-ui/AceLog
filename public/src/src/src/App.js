import { useState, useCallback } from “react”;

const initialAces = [
{ id: 1, course: “Hawk Island Park – Lansing, MI”, hole: 7, distance: 215, disc: “Innova Destroyer”, date: “2025-08-14”, notes: “Hyzer flip that hit the top of the cage and dropped in!”, media: [] },
];

function AceLogLogo({ size = 56 }) {
return (
<svg width={size} height={size} viewBox="0 0 56 56" fill="none">
<rect x="26.5" y="30" width="3" height="18" rx="1.5" fill="#5C4033" opacity="0.7"/>
{[21,24,27,30,33,35].map((x,i)=>(
<line key={i} x1={x} y1="22" x2="28" y2="32" stroke="#A0AEC0" strokeWidth="0.9" strokeLinecap="round"/>
))}
<ellipse cx="28" cy="22" rx="10" ry="3" stroke="#6B7280" strokeWidth="1.8" fill="none"/>
<ellipse cx="28" cy="32" rx="7" ry="2" stroke="#6B7280" strokeWidth="1.5" fill="none"/>
<g transform="rotate(-20,38,10)">
<ellipse cx="38" cy="10" rx="9" ry="4" fill="#F9A825" stroke="#F57F17" strokeWidth="1.2"/>
<ellipse cx="38" cy="10" rx="5" ry="2.2" fill="#FFD54F" opacity="0.7"/>
</g>
<line x1="44" y1="6" x2="48" y2="4" stroke="#F9A825" strokeWidth="1.2" strokeLinecap="round" opacity="0.6"/>
<line x1="43" y1="9" x2="47.5" y2="8.5" stroke="#F9A825" strokeWidth="1" strokeLinecap="round" opacity="0.4"/>
</svg>
);
}

function Badge({ children, color = “green” }) {
const colors = { green:“bg-emerald-100 text-emerald-800”, blue:“bg-sky-100 text-sky-700” };
return <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full tracking-wide ${colors[color]}`}>{children}</span>;
}

function AceCard({ ace, onDelete, onView }) {
return (
<div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-4 hover:shadow-md transition-all duration-200">
<div className="flex justify-between items-start mb-3">
<div>
<h3 className="font-extrabold text-stone-800 text-base leading-tight">{ace.course}</h3>
<p className="text-xs text-stone-400 mt-0.5">{new Date(ace.date).toLocaleDateString(“en-US”,{year:“numeric”,month:“long”,day:“numeric”})}</p>
</div>
<div className="flex flex-col items-end gap-1.5">
<Badge color="green">🏆 ACE</Badge>
<Badge color="blue">Hole {ace.hole}</Badge>
</div>
</div>
<div className="grid grid-cols-2 gap-2 my-3">
<div className="bg-stone-50 rounded-xl p-2.5 text-center border border-stone-100">
<p className="text-stone-400 text-xs font-medium mb-0.5">Distance</p>
<p className="font-extrabold text-stone-700 text-base">{ace.distance} <span className="text-xs font-semibold text-stone-400">ft</span></p>
</div>
<div className="bg-stone-50 rounded-xl p-2.5 text-center border border-stone-100">
<p className="text-stone-400 text-xs font-medium mb-0.5">Disc</p>
<p className="font-extrabold text-stone-700 text-sm truncate">{ace.disc}</p>
</div>
</div>
{ace.notes && <p className="text-stone-400 text-xs italic mb-3 line-clamp-2">”{ace.notes}”</p>}
{ace.media?.length > 0 && (
<div className="flex gap-2 mb-3 overflow-x-auto">
{ace.media.map((m,i)=>(
<div key={i} className="shrink-0 w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
{m.type===“video”
? <div className="w-full h-full flex items-center justify-center text-xl">🎥</div>
: <img src={m.url} alt="" className="w-full h-full object-cover"/>}
</div>
))}
</div>
)}
<div className="flex gap-2 mt-3">
<button onClick={()=>onView(ace)} className=“flex-1 text-sm bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-2 rounded-xl transition-colors”>View</button>
<button onClick={()=>onDelete(ace.id)} className=“px-4 text-sm bg-stone-100 hover:bg-red-50 text-stone-400 hover:text-red-400 font-bold py-2 rounded-xl transition-colors”>✕</button>
</div>
</div>
);
}

// Defined at module level so it never remounts
function ViewModal({ ace, onClose }) {
if (!ace) return null;
return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
<div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-stone-100">
<h2 className="text-xl font-extrabold text-stone-800">🏆 Ace Details</h2>
<button onClick={onClose} className="text-stone-300 hover:text-stone-500 text-2xl leading-none">×</button>
</div>
<div className="px-6 py-5 space-y-5">
<div>
<p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Course</p>
<p className="font-extrabold text-stone-800 text-xl mt-0.5">{ace.course}</p>
</div>
<div className="grid grid-cols-3 gap-3">
<div className="bg-emerald-50 rounded-2xl p-3 text-center border border-emerald-100">
<p className="text-xs text-emerald-500 font-semibold">Hole</p>
<p className="font-black text-emerald-700 text-2xl">{ace.hole}</p>
</div>
<div className="bg-sky-50 rounded-2xl p-3 text-center border border-sky-100">
<p className="text-xs text-sky-500 font-semibold">Distance</p>
<p className="font-black text-sky-700 text-xl">{ace.distance}<span className="text-sm">ft</span></p>
</div>
<div className="bg-amber-50 rounded-2xl p-3 text-center border border-amber-100">
<p className="text-xs text-amber-500 font-semibold">Date</p>
<p className="font-bold text-amber-700 text-xs mt-1">{new Date(ace.date).toLocaleDateString(“en-US”,{month:“short”,day:“numeric”,year:“numeric”})}</p>
</div>
</div>
<div>
<p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Disc Thrown</p>
<p className="font-bold text-stone-700 mt-0.5">{ace.disc}</p>
</div>
{ace.notes && (
<div>
<p className="text-xs text-stone-400 uppercase tracking-widest font-semibold">Notes</p>
<p className="text-stone-600 italic mt-0.5 leading-relaxed">”{ace.notes}”</p>
</div>
)}
{ace.media?.length > 0 && (
<div>
<p className="text-xs text-stone-400 uppercase tracking-widest font-semibold mb-2">Photos & Videos</p>
<div className="grid grid-cols-3 gap-2">
{ace.media.map((m,i)=>(
<div key={i} className="rounded-xl overflow-hidden bg-stone-100 aspect-square flex items-center justify-center border border-stone-200">
{m.type===“video” ? <span className="text-4xl">🎥</span> : <img src={m.url} alt="" className="w-full h-full object-cover"/>}
</div>
))}
</div>
</div>
)}
</div>
</div>
</div>
);
}

// Defined at module level — stable identity, never remounts
function AddModal({ visible, onClose, onSave }) {
const [course, setCourse] = useState(””);
const [hole, setHole] = useState(””);
const [distance, setDistance] = useState(””);
const [disc, setDisc] = useState(””);
const [date, setDate] = useState(new Date().toISOString().split(“T”)[0]);
const [notes, setNotes] = useState(””);
const [media, setMedia] = useState([]);
const [errors, setErrors] = useState({});

const handleClose = useCallback(() => {
setCourse(””); setHole(””); setDistance(””); setDisc(””);
setDate(new Date().toISOString().split(“T”)[0]);
setNotes(””); setMedia([]); setErrors({});
onClose();
}, [onClose]);

const handleMedia = (e) => {
Array.from(e.target.files).forEach(file => {
const url = URL.createObjectURL(file);
const type = file.type.startsWith(“video”) ? “video” : “image”;
if (type === “video”) {
// Generate thumbnail from first frame
const video = document.createElement(“video”);
video.preload = “metadata”;
video.muted = true;
video.playsInline = true;
video.src = url;
video.onloadeddata = () => {
video.currentTime = 0.1;
};
video.onseeked = () => {
const canvas = document.createElement(“canvas”);
canvas.width = video.videoWidth;
canvas.height = video.videoHeight;
canvas.getContext(“2d”).drawImage(video, 0, 0);
const thumb = canvas.toDataURL(“image/jpeg”);
setMedia(m => […m, { url, thumb, type }]);
video.src = “”;
};
} else {
setMedia(m => […m, { url, type }]);
}
});
};

const removeMedia = useCallback((idx) => {
setMedia(m => m.filter((_,i) => i !== idx));
}, []);

const handleSave = () => {
const e = {};
if (!course.trim()) e.course = “Required”;
if (!hole || hole < 1 || hole > 27) e.hole = “Enter 1–27”;
if (!distance || distance < 1) e.distance = “Required”;
if (!disc.trim()) e.disc = “Required”;
if (!date) e.date = “Required”;
setErrors(e);
if (Object.keys(e).length > 0) return;
onSave({ course, hole: parseInt(hole), distance: parseInt(distance), disc, date, notes, media, id: Date.now() });
handleClose();
};

const base = “w-full border rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 bg-stone-50 transition”;

if (!visible) return null;
return (
<div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
<div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
<div className="flex justify-between items-center px-6 pt-6 pb-4 border-b border-stone-100">
<h2 className="text-xl font-extrabold text-stone-800">🥏 Log a New Ace</h2>
<button onClick={handleClose} className="text-stone-300 hover:text-stone-500 text-2xl leading-none">×</button>
</div>
<div className="px-6 py-5 space-y-4">

```
      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Course Name</label>
        <input
          className={`${base} ${errors.course ? "border-red-300" : "border-stone-200"}`}
          placeholder="e.g. Hawk Island Park – Lansing, MI"
          value={course}
          onChange={e => setCourse(e.target.value)}
        />
        {errors.course && <p className="text-red-400 text-xs mt-1">{errors.course}</p>}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Hole #</label>
          <input
            type="number" min="1" max="27"
            className={`${base} ${errors.hole ? "border-red-300" : "border-stone-200"}`}
            placeholder="e.g. 7"
            value={hole}
            onChange={e => setHole(e.target.value)}
          />
          {errors.hole && <p className="text-red-400 text-xs mt-1">{errors.hole}</p>}
        </div>
        <div>
          <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Distance (ft)</label>
          <input
            type="number" min="1"
            className={`${base} ${errors.distance ? "border-red-300" : "border-stone-200"}`}
            placeholder="e.g. 215"
            value={distance}
            onChange={e => setDistance(e.target.value)}
          />
          {errors.distance && <p className="text-red-400 text-xs mt-1">{errors.distance}</p>}
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Disc Thrown</label>
        <input
          className={`${base} ${errors.disc ? "border-red-300" : "border-stone-200"}`}
          placeholder="e.g. Innova Destroyer"
          value={disc}
          onChange={e => setDisc(e.target.value)}
        />
        {errors.disc && <p className="text-red-400 text-xs mt-1">{errors.disc}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Date Thrown</label>
        <input
          type="date"
          className={`${base} ${errors.date ? "border-red-300" : "border-stone-200"}`}
          value={date}
          onChange={e => setDate(e.target.value)}
        />
        {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date}</p>}
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Notes (optional)</label>
        <textarea
          className={`${base} border-stone-200 resize-none`}
          rows={3}
          placeholder="Describe the shot, conditions, reaction..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-1.5">Photos & Videos</label>
        <label className="flex items-center justify-center gap-2 border-2 border-dashed border-emerald-200 rounded-xl p-4 cursor-pointer hover:bg-emerald-50 transition text-emerald-500 text-sm font-bold bg-stone-50">
          📎 Add Photos or Videos
          <input type="file" accept="image/*,video/*" multiple className="hidden" onChange={handleMedia}/>
        </label>
        {media.length > 0 && (
          <div className="flex gap-2 mt-2 flex-wrap">
            {media.map((m,i)=>(
              <div key={i} className="relative w-14 h-14 rounded-xl overflow-hidden bg-stone-100 border border-stone-200">
                <img src={m.thumb || m.url} alt="" className="w-full h-full object-cover"/>
                {m.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl">
                    <span className="text-white text-lg">▶</span>
                  </div>
                )}
                <button onClick={()=>removeMedia(i)} className="absolute top-0 right-0 bg-red-400 text-white text-xs w-5 h-5 flex items-center justify-center rounded-bl-lg font-bold">×</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <button onClick={handleSave} className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold py-3.5 rounded-2xl transition-colors text-base tracking-wide shadow-sm">
        🏆 Log This Ace!
      </button>
    </div>
  </div>
</div>
```

);
}

export default function AceLog() {
const [aces, setAces] = useState(initialAces);
const [showAdd, setShowAdd] = useState(false);
const [viewAce, setViewAce] = useState(null);
const [search, setSearch] = useState(””);

const handleClose = useCallback(() => setShowAdd(false), []);
const handleSave = useCallback((ace) => setAces(prev => [ace, …prev]), []);
const handleDelete = useCallback((id) => setAces(a => a.filter(x => x.id !== id)), []);

const filtered = aces.filter(a =>
a.course.toLowerCase().includes(search.toLowerCase()) ||
a.disc.toLowerCase().includes(search.toLowerCase())
);

const longestAce = aces.length ? Math.max(…aces.map(a => a.distance)) : 0;

return (
<div className=“min-h-screen” style={{ background:“linear-gradient(160deg,#f0fdf4 0%,#ecfdf5 40%,#f5f5f0 100%)” }}>
<div style={{ background:“linear-gradient(135deg,#166534 0%,#15803d 55%,#16a34a 100%)” }} className=“px-5 pt-12 pb-8 relative overflow-hidden”>
<div className=“absolute -top-8 -right-8 w-40 h-40 rounded-full opacity-10” style={{ background:“radial-gradient(circle,#bbf7d0,transparent)” }}/>
<div className=“absolute bottom-0 left-0 w-28 h-28 rounded-full opacity-10” style={{ background:“radial-gradient(circle,#bbf7d0,transparent)” }}/>
<div className="max-w-lg mx-auto relative">
<div className="flex items-center gap-3 mb-1">
<div className="bg-white/15 rounded-2xl p-2 backdrop-blur-sm border border-white/20">
<AceLogLogo size={48}/>
</div>
<div>
<h1 className=“text-4xl font-black text-white tracking-tight leading-none” style={{ letterSpacing:”-0.03em” }}>AceLog</h1>
<p className="text-emerald-200 text-xs font-semibold tracking-widest uppercase mt-0.5">Disc Golf Ace Tracker</p>
</div>
</div>
<div className="grid grid-cols-3 gap-2.5 mt-6">
{[
{ label:“Total Aces”, value:aces.length, icon:“🏆” },
{ label:“Longest”, value:`${longestAce}ft`, icon:“📏” },
{ label:“Courses”, value:new Set(aces.map(a=>a.course)).size, icon:“🌲” },
].map(s=>(
<div key={s.label} className=“rounded-2xl p-3 text-center” style={{ background:“rgba(255,255,255,0.12)”, backdropFilter:“blur(8px)”, border:“1px solid rgba(255,255,255,0.18)” }}>
<p className="text-lg leading-none">{s.icon}</p>
<p className="font-black text-white text-xl mt-1 leading-none">{s.value}</p>
<p className="text-emerald-200 text-xs mt-1 font-medium">{s.label}</p>
</div>
))}
</div>
</div>
</div>

```
  <div className="max-w-lg mx-auto px-4 py-5">
    <div className="flex gap-2 mb-5">
      <div className="flex-1 relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300 text-sm">🔍</span>
        <input
          className="w-full border border-stone-200 bg-white rounded-xl pl-8 pr-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-400 transition"
          placeholder="Search your aces..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>
      <button onClick={()=>setShowAdd(true)} className="bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold px-4 py-2.5 rounded-xl shadow-sm transition text-sm whitespace-nowrap">
        + Log Ace
      </button>
    </div>

    {filtered.length === 0 ? (
      <div className="text-center py-20 text-stone-400">
        <div className="inline-block mb-4"><AceLogLogo size={72}/></div>
        <p className="font-extrabold text-lg text-stone-500">No aces yet</p>
        <p className="text-sm mt-1">Get out there and snap one in!</p>
      </div>
    ) : (
      <div className="grid gap-3">
        {filtered.map(ace=>(
          <AceCard key={ace.id} ace={ace} onDelete={handleDelete} onView={setViewAce}/>
        ))}
      </div>
    )}
  </div>

  <AddModal visible={showAdd} onClose={handleClose} onSave={handleSave} />
  <ViewModal ace={viewAce} onClose={()=>setViewAce(null)} />
</div>
```

);
}

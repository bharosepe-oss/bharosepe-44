const Demo = () => {
  return (
    <div className="min-h-screen bg-background text-foreground px-4 py-8 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
              Bharosepe
            </p>
            <h1 className="mt-2 text-3xl font-bold md:text-5xl">Demo Video</h1>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-sm">
          <video
            src="/Bharose%20Demo%20Video.mp4"
            controls
            playsInline
            autoPlay={false}
            className="h-auto w-full bg-black"
            preload="metadata"
          />
        </div>
      </div>
    </div>
  );
};

export default Demo;

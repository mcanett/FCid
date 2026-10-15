export default function LoadingAdolescentDetail() {
    return (
      <div className="space-y-6 animate-pulse">
        {/* Info básica */}
        <section className="space-y-2">
          <div className="h-6 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-4 w-32 bg-gray-200 rounded" />
        </section>
  
        {/* QR */}
        <section className="space-y-2">
          <div className="h-4 w-24 bg-gray-200 rounded" />
          <div className="h-40 w-40 bg-gray-200 rounded" />
        </section>
  
        {/* Tutores */}
        <section className="space-y-2">
          <div className="h-4 w-32 bg-gray-200 rounded" />
          <div className="h-4 w-64 bg-gray-200 rounded" />
          <div className="h-4 w-56 bg-gray-200 rounded" />
        </section>
  
        {/* Eventos */}
        <section className="space-y-2">
          <div className="h-4 w-40 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </section>
      </div>
    )
  }
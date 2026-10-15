type Props = {
    status: "success" | "error"
    message: string
  }
  
  export default function CheckInResult({ status, message }: Props) {
    return (
      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 8,
          backgroundColor: status === "success" ? "#d1fae5" : "#fee2e2",
          color: status === "success" ? "#065f46" : "#991b1b"
        }}
      >
        {message}
      </div>
    )
  }
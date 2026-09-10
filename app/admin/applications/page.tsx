import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function AdminApplicationsPage() {
  const applications = await prisma.application.findMany({
    orderBy: {
      createdAt: "desc",
    },
    include: {
      User: true,
      job: true,
    },
  });

  const applicantIds = [
    ...new Set(applications.map((application) => application.applicantId)),
  ];

  const verificationRequests =
    applicantIds.length > 0
      ? await prisma.verificationRequest.findMany({
          where: {
            userId: {
              in: applicantIds,
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        })
      : [];

  // Keep only the latest payment/verification request for each applicant.
  const latestPaymentByUser = new Map<
    number,
    (typeof verificationRequests)[number]
  >();

  for (const payment of verificationRequests) {
    if (!latestPaymentByUser.has(payment.userId)) {
      latestPaymentByUser.set(payment.userId, payment);
    }
  }

  return (
    <main
      style={{
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "32px",
            }}
          >
            Applications
          </h1>

          <p
            style={{
              color: "#666",
              marginTop: "8px",
            }}
          >
            Review student applications, contact details, payment status and
            CVs.
          </p>
        </div>

        <Link
          href="/admin"
          style={{
            textDecoration: "none",
            padding: "10px 16px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            color: "#333",
          }}
        >
          Back to Admin
        </Link>
      </div>

      <div
        style={{
          overflowX: "auto",
          border: "1px solid #ddd",
          borderRadius: "12px",
          background: "#fff",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            minWidth: "1200px",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#f5f5f5",
              }}
            >
              <th style={headerStyle}>Applicant</th>
              <th style={headerStyle}>Email</th>
              <th style={headerStyle}>Phone</th>
              <th style={headerStyle}>Job</th>
              <th style={headerStyle}>Application Ref</th>
              <th style={headerStyle}>Application Status</th>
              <th style={headerStyle}>Payment</th>
              <th style={headerStyle}>CV</th>
              <th style={headerStyle}>Date</th>
              <th style={headerStyle}>Action</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td
                  colSpan={10}
                  style={{
                    padding: "40px",
                    textAlign: "center",
                    color: "#777",
                  }}
                >
                  No applications found.
                </td>
              </tr>
            ) : (
              applications.map((application) => {
                const payment = latestPaymentByUser.get(
                  application.applicantId
                );

                return (
                  <tr key={application.id}>
                    {/* Applicant */}
                    <td style={cellStyle}>
                      {application.User?.fullName || "Unknown"}
                    </td>

                    {/* Email */}
                    <td style={cellStyle}>
                      {application.User?.email || "Not provided"}
                    </td>

                    {/* PHONE - stored directly on Application */}
                    <td style={cellStyle}>
                      {application.phone || "Not provided"}
                    </td>

                    {/* Job */}
                    <td style={cellStyle}>
                      {application.job?.title || "Unknown job"}
                    </td>

                    {/* Application Reference */}
                    <td style={cellStyle}>
                      {application.referenceNumber || "Not assigned"}
                    </td>

                    {/* Application Status */}
                    <td style={cellStyle}>
                      <span
                        style={{
                          padding: "5px 10px",
                          borderRadius: "20px",
                          background: "#eef2ff",
                          fontSize: "13px",
                        }}
                      >
                        {application.status}
                      </span>
                    </td>

                    {/* Payment */}
                    <td style={cellStyle}>
                      {payment ? (
                        <div>
                          <div>
                            <strong>{payment.amount}</strong>
                          </div>

                          <div
                            style={{
                              fontSize: "12px",
                              marginTop: "4px",
                              color:
                                payment.status === "VERIFIED"
                                  ? "green"
                                  : payment.status === "REJECTED"
                                  ? "red"
                                  : "#b26a00",
                            }}
                          >
                            {payment.status}
                          </div>

                          {payment.proofPath && (
                            <a
                              href={payment.proofPath}
                              target="_blank"
                              rel="noreferrer"
                              style={{
                                display: "inline-block",
                                marginTop: "6px",
                                fontSize: "12px",
                              }}
                            >
                              View Payment Proof
                            </a>
                          )}
                        </div>
                      ) : (
                        "No payment"
                      )}
                    </td>

                    {/* CV */}
                    <td style={cellStyle}>
                      {application.cvPath ? (
                        <a
                          href={application.cvPath}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          View CV
                        </a>
                      ) : (
                        "No CV"
                      )}
                    </td>

                    {/* Date */}
                    <td style={cellStyle}>
                      {new Date(application.createdAt).toLocaleDateString()}
                    </td>

                    {/* Action */}
                    <td style={cellStyle}>
                      <Link
                        href={`/admin/applications/${application.id}`}
                        style={{
                          textDecoration: "none",
                          fontWeight: "bold",
                        }}
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}

const headerStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px",
  borderBottom: "1px solid #ddd",
  fontSize: "14px",
  whiteSpace: "nowrap",
};

const cellStyle: React.CSSProperties = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  fontSize: "14px",
  verticalAlign: "top",
};
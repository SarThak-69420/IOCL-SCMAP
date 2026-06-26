import React, { useEffect, useState } from "react";
import api from "../services/api";

function Profile() {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);

  const [showPasswordModal, setShowPasswordModal] =
    useState(false);

  const [passwordData, setPasswordData] =
    useState({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = () => {
    api
      .get("users/me/")
      .then((res) => {
        setUser(res.data);
      })
      .catch(console.error);
  };

  const saveProfile = () => {
    api
      .put("users/me/", {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
      })
      .then(() => {
        alert("Profile Updated Successfully");

        setEditing(false);

        loadProfile();

        localStorage.setItem(
          "user",
          JSON.stringify({
            ...JSON.parse(
              localStorage.getItem("user") ||
                "{}"
            ),
            ...user,
          })
        );
      })
      .catch(console.error);
  };

  const changePassword = () => {
    if (
      passwordData.new_password !==
      passwordData.confirm_password
    ) {
      alert("Passwords do not match");
      return;
    }

    api
      .post(
        "users/change-password/",
        {
          old_password:
            passwordData.old_password,
          new_password:
            passwordData.new_password,
        }
      )
      .then(() => {
        alert(
          "Password changed successfully"
        );

        setShowPasswordModal(false);

        setPasswordData({
          old_password: "",
          new_password: "",
          confirm_password: "",
        });
      })
      .catch((err) => {
        alert(
          err.response?.data?.error ||
            "Failed to change password"
        );
      });
  };

  return (
    <div>
      <div
        style={{
          background:
            "linear-gradient(135deg,#001845,#0056d6)",
          color: "white",
          padding: "45px",
          borderRadius: "28px",
          marginBottom: "30px",
        }}
      >
        <h1
          style={{
            margin: 0,
            fontSize: "46px",
            fontWeight: "800",
          }}
        >
          My Profile
        </h1>

        <p
          style={{
            marginTop: "10px",
            color: "#dbeafe",
            fontSize: "18px",
          }}
        >
          Manage your IOCL Smart Complaint
          Management System account.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "340px 1fr",
          gap: "30px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "35px",
            textAlign: "center",
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          <img
            src="/pic.jpg"
            alt="Profile"
            style={{
              width: "150px",
              height: "150px",
              objectFit: "cover",
              borderRadius: "50%",
              border:
                "5px solid #2563eb",
              display: "block",
              margin:
                "0 auto 20px auto",
            }}
          />

          <h2>{user.username}</h2>

          <span
            style={{
              background: "#2563eb",
              color: "white",
              padding: "8px 18px",
              borderRadius: "20px",
              fontWeight: "600",
            }}
          >
            {user.role}
          </span>

          <hr
            style={{
              margin: "30px 0",
            }}
          />

          <button
            onClick={() => {
              if (editing) {
                saveProfile();
              } else {
                setEditing(true);
              }
            }}
            style={{
              width: "100%",
              padding: "14px",
              background:
                "#2563eb",
              color: "white",
              border: "none",
              borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "600",
              marginBottom: "15px",
            }}
          >
            {editing
              ? "Save Changes"
              : "Edit Profile"}
          </button>

          <button
            onClick={() =>
              setShowPasswordModal(true)
            }
            style={{
              width: "100%",
              padding: "14px",
              background: "#f8fafc",
              border:
                "1px solid #d1d5db",
              borderRadius: "12px",
              cursor: "pointer",
            }}
          >
            Change Password
          </button>
        </div>

        <div
          style={{
            background: "white",
            borderRadius: "25px",
            padding: "35px",
            boxShadow:
              "0 12px 30px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              marginBottom: "30px",
            }}
          >
            Account Information
          </h2>
                    <EditableField
            title="First Name"
            editing={editing}
            value={user.first_name}
            onChange={(value) =>
              setUser({
                ...user,
                first_name: value,
              })
            }
          />

          <EditableField
            title="Last Name"
            editing={editing}
            value={user.last_name}
            onChange={(value) =>
              setUser({
                ...user,
                last_name: value,
              })
            }
          />

          <Info
            title="Username"
            value={user.username}
          />

          <EditableField
            title="Email"
            editing={editing}
            value={user.email}
            onChange={(value) =>
              setUser({
                ...user,
                email: value,
              })
            }
          />

          <EditableField
            title="Phone"
            editing={editing}
            value={user.phone}
            onChange={(value) =>
              setUser({
                ...user,
                phone: value,
              })
            }
          />

          <Info
            title="Role"
            value={user.role}
          />

          <Info
            title="Employee ID"
            value={user.employee_id}
          />

          <Info
            title="Account Status"
            value="Active"
          />

          <Info
            title="Last Login"
            value={new Date().toLocaleString()}
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3,1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >
        <Stat
          title="Complaints Created"
          value="--"
          color="#2563eb"
        />

        <Stat
          title="Complaints Assigned"
          value="--"
          color="#f59e0b"
        />

        <Stat
          title="Resolved Cases"
          value="--"
          color="#22c55e"
        />
      </div>

      {showPasswordModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background:
              "rgba(0,0,0,0.45)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 999,
          }}
        >
          <div
            style={{
              width: "430px",
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow:
                "0 15px 40px rgba(0,0,0,0.2)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
              }}
            >
              Change Password
            </h2>

            <input
              type="password"
              placeholder="Current Password"
              value={
                passwordData.old_password
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  old_password:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "20px",
                borderRadius: "10px",
                border:
                  "1px solid #d1d5db",
              }}
            />

            <input
              type="password"
              placeholder="New Password"
              value={
                passwordData.new_password
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  new_password:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "10px",
                border:
                  "1px solid #d1d5db",
              }}
            />

            <input
              type="password"
              placeholder="Confirm Password"
              value={
                passwordData.confirm_password
              }
              onChange={(e) =>
                setPasswordData({
                  ...passwordData,
                  confirm_password:
                    e.target.value,
                })
              }
              style={{
                width: "100%",
                padding: "12px",
                marginTop: "15px",
                borderRadius: "10px",
                border:
                  "1px solid #d1d5db",
              }}
            />

            <div
              style={{
                display: "flex",
                justifyContent:
                  "flex-end",
                gap: "10px",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() =>
                  setShowPasswordModal(
                    false
                  )
                }
              >
                Cancel
              </button>

              <button
                onClick={changePassword}
                style={{
                  background:
                    "#2563eb",
                  color: "white",
                  border: "none",
                  padding:
                    "10px 18px",
                  borderRadius: "8px",
                  cursor: "pointer",
                }}
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      )}
          </div>
  );
}

function EditableField({
  title,
  value,
  editing,
  onChange,
}) {
  return (
    <div
      style={{
        marginBottom: "22px",
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: "14px",
          marginBottom: "8px",
        }}
      >
        {title}
      </div>

      {editing ? (
        <input
          value={value || ""}
          onChange={(e) =>
            onChange(e.target.value)
          }
          style={{
            width: "100%",
            padding: "12px",
            border: "1px solid #d1d5db",
            borderRadius: "10px",
            fontSize: "15px",
            outline: "none",
          }}
        />
      ) : (
        <div
          style={{
            fontWeight: "700",
            fontSize: "18px",
          }}
        >
          {value || "-"}
        </div>
      )}
    </div>
  );
}

function Info({
  title,
  value,
}) {
  return (
    <div
      style={{
        marginBottom: "22px",
      }}
    >
      <div
        style={{
          color: "#64748b",
          fontSize: "14px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "6px",
          fontWeight: "700",
          fontSize: "18px",
        }}
      >
        {value || "-"}
      </div>
    </div>
  );
}

function Stat({
  title,
  value,
  color,
}) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "20px",
        padding: "30px",
        boxShadow:
          "0 10px 25px rgba(0,0,0,0.06)",
        borderTop: `5px solid ${color}`,
      }}
    >
      <div
        style={{
          color: "#64748b",
          marginBottom: "12px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          fontSize: "42px",
          fontWeight: "700",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default Profile;
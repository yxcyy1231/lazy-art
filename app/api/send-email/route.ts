import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const STUDIO_NOTIFY_EMAIL = "lazyartus@gmail.com";

export async function POST(req: Request) {
  try {
    console.log("📨 收到寄信 API");

    const {
      email,
      parentName,
      courseName,
      phone,
      lineId,
      childName,
      note,
      scheduleTitle,
      scheduleTime,
      price,
      totalPrice,
    } = await req.json();

    console.log("Email：", email);
    console.log("家長：", parentName);
    console.log("課程：", courseName);

    if (!email) {
      return Response.json(
        { message: "沒有收到 Email" },
        { status: 400 }
      );
    }

    const hasPlanInfo =
      scheduleTitle || scheduleTime || price || totalPrice;

    const planInfoHtml = hasPlanInfo
      ? `
  <div style="background:#FAF7F2;border-radius:12px;padding:20px;margin:20px 0;">
    ${scheduleTitle ? `<p style="margin:0 0 10px;">報名方案：<strong>${scheduleTitle}</strong></p>` : ""}
    ${scheduleTime ? `<p style="margin:0 0 10px;">上課時間：<strong>${scheduleTime}</strong></p>` : ""}
    ${price ? `<p style="margin:0 0 10px;">單堂費用：<strong>NT$${price}</strong></p>` : ""}
    ${totalPrice ? `<p style="margin:0;">應付總金額：<strong>NT$${totalPrice}</strong></p>` : ""}
  </div>
  `
      : "";

    /* =========================
        寄給家長：報名成功通知
    ========================= */

    const { data, error } = await resend.emails.send({
      from: "Lazy Art <onboarding@resend.dev>",
      to: email,
      subject: "🎨 Lazy Art｜報名成功通知",

      html: `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:32px;background:#fff;border-radius:12px;border:1px solid #eee;">

    <h2 style="color:#8B1E2D;">🎨 Lazy Art 懶得畫室</h2>

    <p>親愛的 <strong>${parentName}</strong> 您好：</p>

    <p>
      感謝您報名
      <strong>${courseName}</strong>！
    </p>

    <p>
      我們已收到您的報名資料。
    </p>

    ${planInfoHtml}

    <hr style="margin:24px 0;" />

    <h3>📍 教室地址</h3>

    <p>
      台北市中山區龍江路209巷17號2樓
    </p>

    <hr style="margin:24px 0;" />

    <h3>💳 下一步：加入官方 LINE 完成匯款</h3>

    <p>
      請點擊下方按鈕加入
      <strong>Lazy Art 官方 LINE</strong>，
      我們將提供匯款資訊。
    </p>

    <p>
      完成匯款後，請於 LINE 回覆：
    </p>

    <ul>
      <li>家長姓名</li>
      <li>報名課程</li>
      <li>匯款帳號後五碼</li>
    </ul>

    <div style="margin:30px 0;text-align:center;">
      <a
        href="https://lin.ee/UPkos4l"
        style="
          display:inline-block;
          background:#8B1E2D;
          color:#ffffff;
          padding:14px 28px;
          border-radius:999px;
          text-decoration:none;
          font-weight:bold;
          font-size:16px;
        "
      >
        👉 加入官方 LINE
      </a>
    </div>

    <hr style="margin:24px 0;" />

    <p>
      完成加入官方 LINE 並完成匯款後，
      我們將正式為您保留名額。
    </p>

    <p>
      如有任何問題，
      歡迎透過官方 LINE 與我們聯繫。
    </p>

    <p>
      期待與您及孩子在課堂上相見！
    </p>

    <p style="margin-top:32px;">
      <strong>Lazy Art 懶得畫室</strong>
    </p>

  </div>
  `,
    });

    console.log("Resend data：", data);
    console.log("Resend error：", error);

    if (error) {
      return Response.json(error, { status: 400 });
    }

    /* =========================
        寄給畫室：內部通知
        （家長的信如果失敗會直接中斷，
        這封失敗則不影響家長那邊，只記錄在 log）
    ========================= */

    try {
      await resend.emails.send({
        from: "Lazy Art 報名通知 <onboarding@resend.dev>",
        to: STUDIO_NOTIFY_EMAIL,
        subject: `🔔 新報名｜${courseName ?? ""}｜${parentName ?? ""}`,

        html: `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:24px;">

    <h2 style="color:#8B1E2D;">🔔 新的報名通知</h2>

    <table style="width:100%;border-collapse:collapse;font-size:15px;">
      <tbody>
        <tr><td style="padding:6px 0;color:#888;width:110px;">課程</td><td style="padding:6px 0;"><strong>${courseName ?? "-"}</strong></td></tr>
        ${scheduleTitle ? `<tr><td style="padding:6px 0;color:#888;">方案</td><td style="padding:6px 0;">${scheduleTitle}</td></tr>` : ""}
        ${scheduleTime ? `<tr><td style="padding:6px 0;color:#888;">時間</td><td style="padding:6px 0;">${scheduleTime}</td></tr>` : ""}
        <tr><td style="padding:6px 0;color:#888;">家長姓名</td><td style="padding:6px 0;">${parentName ?? "-"}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">小朋友姓名</td><td style="padding:6px 0;">${childName ?? "-"}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">Email</td><td style="padding:6px 0;">${email ?? "-"}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">電話</td><td style="padding:6px 0;">${phone ?? "-"}</td></tr>
        <tr><td style="padding:6px 0;color:#888;">LINE ID</td><td style="padding:6px 0;">${lineId ?? "-"}</td></tr>
        ${note ? `<tr><td style="padding:6px 0;color:#888;vertical-align:top;">備註</td><td style="padding:6px 0;">${note}</td></tr>` : ""}
        ${price ? `<tr><td style="padding:6px 0;color:#888;">單堂費用</td><td style="padding:6px 0;">NT$${price}</td></tr>` : ""}
        ${totalPrice ? `<tr><td style="padding:6px 0;color:#888;">應付總金額</td><td style="padding:6px 0;"><strong>NT$${totalPrice}</strong></td></tr>` : ""}
      </tbody>
    </table>

    <p style="margin-top:24px;color:#aaa;font-size:13px;">
      這封信會在家長完成報名後自動寄出，報名資料也同步存在 Supabase 的 registrations 表。
    </p>

  </div>
  `,
      });
    } catch (notifyErr) {
      console.error("寄送內部通知信失敗（不影響家長收到的信）：", notifyErr);
    }

    return Response.json({
      success: true,
      data,
    });
  } catch (err) {
    console.error("寄信失敗：", err);

    return Response.json(
      {
        success: false,
        message: "寄信失敗",
      },
      {
        status: 500,
      }
    );
  }
}

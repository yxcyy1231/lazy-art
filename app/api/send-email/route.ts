import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    console.log("📨 收到寄信 API");

    const {
      email,
      parentName,
      courseName,
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

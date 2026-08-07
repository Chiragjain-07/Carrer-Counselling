export const templates = {
  beam: `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>{{FULL_NAME}} — Resume</title>
<style>
  body{font-family:system-ui,Segoe UI,Roboto,Arial;color:#111;margin:0;padding:20px}
  .page{max-width:800px;margin:0 auto;background:#fff;padding:24px;border-radius:6px}
  header{border-bottom:1px solid #eee;padding-bottom:12px;margin-bottom:16px}
  .name{font-size:28px;font-weight:700}
  .meta{color:#666;font-size:13px;margin-top:6px}
  .section{margin-top:18px}
  .skill{display:inline-block;background:#f3f4f6;padding:6px 10px;border-radius:999px;margin:4px 6px 4px 0;font-size:13px}
  ul{margin:8px 0 0 18px}
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="name">{{FULL_NAME}}</div>
      <div class="meta">{{EMAIL}} · {{PHONE}} · {{LOCATION}} {{#if LINKEDIN_URL}}· <a href="{{LINKEDIN_URL}}">LinkedIn</a>{{/if}}</div>
    </header>

    {{#if SUMMARY}}
    <div class="section">
      <h3>Summary</h3>
      <p>{{SUMMARY}}</p>
    </div>
    {{/if}}

    <div class="section">
      <h3>Experience</h3>
      {{#each EXPERIENCE}}
        <div style="margin-bottom:12px">
          <strong>{{title}}</strong> — {{company}} <span style="color:#666">({{start}} {{#if end}}— {{end}}{{/if}})</span>
          {{#if bullets}}
            <ul>
              {{#each bullets}}<li>{{this}}</li>{{/each}}
            </ul>
          {{/if}}
        </div>
      {{/each}}
    </div>

    <div class="section">
      <h3>Education</h3>
      {{#each EDUCATION}}
        <div style="margin-bottom:10px">
          <strong>{{degree}}</strong> — {{institution}} <span style="color:#666">({{start}} {{#if end}}— {{end}}{{/if}})</span>
        </div>
      {{/each}}
    </div>

    <div class="section">
      <h3>Skills</h3>
      <div>
        {{#each SKILLS}}<span class="skill">{{this}}</span>{{/each}}
      </div>
    </div>

    {{#if PROJECTS}}
    <div class="section">
      <h3>Projects</h3>
      {{#each PROJECTS}}
        <div style="margin-bottom:10px">
          <strong>{{name}}</strong> — {{technologies}} {{#if link}}<div><a href="{{link}}">{{link}}</a></div>{{/if}}
          {{#if description}}<div>{{description}}</div>{{/if}}
        </div>
      {{/each}}
    </div>
    {{/if}}

    {{#if ACHIEVEMENTS}}
    <div class="section">
      <h3>Achievements</h3>
      <ul>
        {{#each ACHIEVEMENTS}}<li>{{this}}</li>{{/each}}
      </ul>
    </div>
    {{/if}}
  </div>
</body>
</html>
  `,

  elegant: `
<!doctype html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/><title>{{FULL_NAME}} — Resume</title>
<style>
  body{font-family:Inter,system-ui,Segoe UI,Roboto;color:#0f172a;margin:0;padding:20px;background:#f8fafc}
  .page{max-width:920px;margin:0 auto;background:#fff;padding:28px;border-radius:10px}
  header{border-bottom:1px solid #eef2f7;padding-bottom:12px;margin-bottom:18px}
  .name{font-size:32px;font-weight:800}
  .tag{color:#6b7280;margin-top:6px}
  .grid{display:flex;gap:28px}
  .left{flex:2}
  .right{flex:1}
  .card{background:#fbfbfd;padding:12px;border-radius:8px;border:1px solid #eef2f7}
  ul{margin:8px 0 0 18px}
</style>
</head>
<body>
  <div class="page">
    <header>
      <div class="name">{{FULL_NAME}}</div>
      <div class="tag">{{TAGLINE}}</div>
      <div style="color:#6b7280;margin-top:8px">{{EMAIL}} · {{PHONE}} · {{LOCATION}}</div>
    </header>

    <div class="grid">
      <div class="left">
        <h4>Experience</h4>
        {{#each EXPERIENCE}}
          <div style="margin-bottom:12px">
            <strong>{{title}}</strong>, {{company}} <div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div>
            {{#if bullets}}<ul>{{#each bullets}}<li>{{this}}</li>{{/each}}</ul>{{/if}}
          </div>
        {{/each}}

        <h4>Education</h4>
        {{#each EDUCATION}}
          <div style="margin-bottom:10px"><strong>{{degree}}</strong> — {{institution}} <div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div></div>
        {{/each}}
      </div>

      <div class="right">
        <div class="card">
          <h4>Skills</h4>
          {{#each SKILLS}}<div>• {{this}}</div>{{/each}}
        </div>

        {{#if PROJECTS}}
        <div class="card" style="margin-top:12px">
          <h4>Projects</h4>
          {{#each PROJECTS}}<div style="margin-bottom:8px"><strong>{{name}}</strong><div style="color:#6b7280">{{technologies}}</div></div>{{/each}}
        </div>
        {{/if}}
      </div>
    </div>
  </div>
</body>
</html>
  `,

  professional: `
<!doctype html>
<html>
<head>
<meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{{FULL_NAME}} — Resume</title>
<style>
  body{font-family:Inter,system-ui;color:#111827;margin:0;padding:20px}
  .page{max-width:850px;margin:0 auto;background:#fff;padding:24px;border-radius:6px}
  header{display:flex;align-items:center;gap:12px;border-bottom:1px solid #eee;padding-bottom:12px;margin-bottom:14px}
  .name{font-size:26px;font-weight:800}
  .contact{margin-left:auto;color:#6b7280}
  .two{display:flex;gap:24px}
  .left{flex:1.2}
  .right{flex:0.8}
  ul{margin:6px 0 0 18px}
</style>
</head>
<body>
  <div class="page">
    <header>
      <div>
        <div class="name">{{FULL_NAME}}</div>
        <div style="color:#6b7280">{{TAGLINE}}</div>
      </div>
      <div class="contact">{{EMAIL}} · {{PHONE}} · {{LOCATION}}</div>
    </header>

    <div class="two">
      <div class="left">
        <h4>Experience</h4>
        {{#each EXPERIENCE}}
          <div style="margin-bottom:12px">
            <strong>{{title}}</strong> — {{company}} <div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div>
            {{#if bullets}}<ul>{{#each bullets}}<li>{{this}}</li>{{/each}}</ul>{{/if}}
          </div>
        {{/each}}

        <h4>Projects</h4>
        {{#each PROJECTS}}
          <div style="margin-bottom:10px"><strong>{{name}}</strong> {{#if technologies}}— <span style="color:#6b7280">{{technologies}}</span>{{/if}}</div>
        {{/each}}
      </div>

      <div class="right">
        <h4>Education</h4>
        {{#each EDUCATION}}<div style="margin-bottom:10px"><strong>{{institution}}</strong><div style="color:#6b7280">{{start}} {{#if end}}— {{end}}{{/if}}</div></div>{{/each}}
        <h4>Skills</h4>
        {{#each SKILLS}}<div>• {{this}}</div>{{/each}}
      </div>
    </div>
  </div>
</body>
</html>
  `
}
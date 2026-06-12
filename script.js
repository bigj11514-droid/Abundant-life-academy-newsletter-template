function shareSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const title = section.querySelector('h2')?.innerText || 'School Newsletter Section';
  const description = section.querySelector('p')?.innerText || '';
  const sectionUrl = `${window.location.origin}${window.location.pathname}#${sectionId}`;
  const shareText = `${title}\n\n${description}\n\nRead more: ${sectionUrl}`;

  if (navigator.share) {
    navigator.share({
      title: title,
      text: shareText,
      url: sectionUrl
    }).catch(() => {
      copyToClipboard(shareText);
      alert('Section copied to clipboard. Paste it into email or chat.');
    });
  } else {
    copyToClipboard(shareText);
    alert('Section content copied to clipboard. Paste it into your chosen share app.');
  }
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  textarea.setAttribute('readonly', '');
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
}

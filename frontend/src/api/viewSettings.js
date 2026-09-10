import { apiFetch } from './client';

export async function getViewSetting(viewName) {
  return await apiFetch(`/view-settings/?view=${viewName}`);
}

export async function updateViewSetting(viewName, backgroundColor) {
  return await apiFetch('/view-settings/update-color/', {
    method: 'PATCH',
    body: JSON.stringify({
      view_name: viewName,
      background_color: backgroundColor,
    }),
  });
}
export const getLanguages = async () => {
  // const URL = 'https://wripanqhmwgnrnknbgkb.supabase.co/rest/v1/languages?select=*'
  // const URL = 'https://wripanqhmwgnrnknbgkb.supabase.co/rest/v1/qualityprofiles?select=*&language_id=eq.2'
  const URL =
    'https://wripanqhmwgnrnknbgkb.supabase.co/auth/v1/token?grant_type=password';

  try {
    const response = await fetch(URL, {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data);

    // return users
  } catch (error) {
    throw Error(error);
  }
};

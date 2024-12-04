export const namesFormatter = (text: string) => {
    return text
      .replace(" ", "_")
      .replace(/[^a-zA-Z0-9_]/g, "")
      .toLowerCase();
  };
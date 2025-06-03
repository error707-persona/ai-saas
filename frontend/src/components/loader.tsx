import React from "react";
import { Loader2 } from "lucide-react";
const Loader = () => {
  return   <>
  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  This may take a few minutes
  </>;
};

export default Loader;

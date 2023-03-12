import { useCallback } from "react";
import { NavigateOptions, To, useNavigate } from "react-router-dom";

export function useNavigateHandler(to: To, options?: NavigateOptions) {
  const navigate = useNavigate();
  const navigateHandler = useCallback(() => {
    navigate(to, options);
  }, [navigate, to, options]);

  return navigateHandler;
}
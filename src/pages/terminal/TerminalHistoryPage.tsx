/**
 * TerminalHistoryPage
 * 처리된 요청 히스토리 페이지
 */

import { ProcessedHistory } from "@/features/terminal/components/ProcessedHistory";
import { useOutletContext } from "react-router-dom";
import type { IssuanceRequest } from "@/types/domain";

interface TerminalContextType {
  processedHistory: IssuanceRequest[];
}

export function TerminalHistoryPage() {
  const { processedHistory } = useOutletContext<TerminalContextType>();

  return <ProcessedHistory requests={processedHistory} />;
}

export default TerminalHistoryPage;

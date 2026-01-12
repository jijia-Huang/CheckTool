import { ComparisonResult } from '../../types';
import ResultItem from './ResultItem';
import './ComparisonResultModule.css';

interface ResultListProps {
  results: ComparisonResult[];
  onItemClick: (result: ComparisonResult) => void;
}

export default function ResultList({ results, onItemClick }: ResultListProps) {
  if (results.length === 0) {
    return (
      <div className="result-list-empty">
        <p>沒有比對結果</p>
      </div>
    );
  }

  return (
    <div className="result-list">
      {results.map((result, index) => (
        <ResultItem
          key={`${result.expectedName}-${index}`}
          result={result}
          onItemClick={onItemClick}
        />
      ))}
    </div>
  );
}

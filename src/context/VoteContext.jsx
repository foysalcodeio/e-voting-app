import { createContext, useContext, useState, useEffect } from 'react';

const VoteContext = createContext();

export const useVotes = () => {
    const context = useContext(VoteContext);
    if (!context) {
        throw new Error('useVotes must be used within VoteProvider');
    }
    return context;
};

const initialVotes = {
    'NCP': 1247,
    'BNP': 2156,
    'Jamayat Sibit': 892,
    'Jatio Party': 1534,
};

export const VoteProvider = ({ children }) => {
    const [votes, setVotes] = useState(() => {
        const saved = localStorage.getItem('voteData');
        return saved ? JSON.parse(saved) : initialVotes;
    });

    const [votedNIDs, setVotedNIDs] = useState(() => {
        const saved = localStorage.getItem('votedNIDs');
        return saved ? JSON.parse(saved) : [];
    });

    const [voterPhoto, setVoterPhoto] = useState(null);

    useEffect(() => {
        localStorage.setItem('voteData', JSON.stringify(votes));
    }, [votes]);

    useEffect(() => {
        localStorage.setItem('votedNIDs', JSON.stringify(votedNIDs));
    }, [votedNIDs]);

    const hasVotedWithNID = (nid) => {
        return votedNIDs.includes(nid);
    };

    const castVote = (candidateName, nid) => {
        if (hasVotedWithNID(nid)) {
            return false; // Already voted
        }

        setVotes(prev => ({
            ...prev,
            [candidateName]: (prev[candidateName] || 0) + 1
        }));

        setVotedNIDs(prev => [...prev, nid]);
        return true; // Vote successful
    };

    const getTotalVotes = () => {
        return Object.values(votes).reduce((sum, count) => sum + count, 0);
    };

    const getVotePercentage = (candidateName) => {
        const total = getTotalVotes();
        return total > 0 ? ((votes[candidateName] || 0) / total * 100).toFixed(1) : 0;
    };

    return (
        <VoteContext.Provider value={{
            votes,
            castVote,
            getTotalVotes,
            getVotePercentage,
            hasVotedWithNID,
            voterPhoto,
            setVoterPhoto
        }}>
            {children}
        </VoteContext.Provider>
    );
};

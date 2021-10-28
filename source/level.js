////////////////////////////////////////////////////////
//*--------------------------------------------------*//
//| Part of Another Side (https://www.maus-games.at) |//
//*--------------------------------------------------*//
//| Released under the zlib License                  |//
//| More information available in the readme file    |//
//*--------------------------------------------------*//
////////////////////////////////////////////////////////
"use strict";


// ****************************************************************
let LVL = 0;

const cLevel = new Array(6);
for(let i = 0, ie = cLevel.length; i < ie; ++i) cLevel[i] = {};


// ****************************************************************
// light change
LVL = 0;

cLevel[LVL].aiValue =
[3, 3, 0, 0, 3, 3,  3, 0, 0, 0, 0, 3,
 3, 0, 0, 3, 3, 0,  0, 0, 0, 3, 3, 3,
 0, 0, 5, 0, 4, 0,  4, 0, 4, 0, 3, 0,
 0, 3, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0,
 3, 3, 4, 0, 5, 0,  4, 0, 4, 0, 0, 0,
 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 3, 0,

 0, 0, 4, 0, 4, 0,  5, 0, 4, 0, 3, 3,
 0, 3, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0,
 3, 3, 4, 0, 4, 0,  4, 0, 5, 0, 3, 0,
 0, 3, 0, 0, 0, 0,  0, 0, 0, 0, 3, 0,
 0, 3, 3, 0, 0, 3,  3, 3, 3, 0, 0, 0,
 3, 3, 0, 0, 0, 0,  0, 3, 0, 0, 3, 3];

cLevel[LVL].pFunction = function(aBlock)
{
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bClicked && (pBlock.m_iType >= 4))
        {
            const x = i % BLOCK_LINE;
            const y = Math.floor(i / BLOCK_LINE);

            for(let j = x - 2; j <= x + 2; ++j)
            {
                for(let k = y - 2; k <= y + 2; ++k)
                {
                    if((j === x) || (k === y))
                    {
                        const pOther = aBlock[j + k * BLOCK_LINE];

                             if(pOther.m_iType === 4) pOther.SetType(5);
                        else if(pOther.m_iType === 5) pOther.SetType(4);
                    }
                }
            }

            break;
        }
    }

    this.bDone = true;
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bActive && (pBlock.m_iType === 4))
        {
            this.bDone = false;
            break;
        }
    }
};


// ****************************************************************
// memory
LVL = 1;

cLevel[LVL].aiValue =
[3, 0, 1, 3, 1, 0,  0, 1, 0, 1, 3, 3,
 3, 3, 0, 3, 0, 0,  0, 0, 0, 0, 0, 3,
 1, 0, 1, 0, 2, 0,  0, 1, 3, 1, 0, 2,
 0, 0, 3, 3, 0, 0,  0, 3, 3, 0, 3, 0,
 2, 0, 1, 3, 1, 0,  0, 1, 0, 2, 3, 1,
 0, 0, 0, 0, 0, 6,  0, 0, 0, 0, 0, 0,

 0, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 0,
 1, 0, 1, 0, 2, 0,  0, 1, 0, 1, 3, 1,
 3, 3, 0, 3, 3, 0,  0, 0, 0, 3, 3, 0,
 1, 3, 1, 3, 1, 0,  0, 2, 0, 1, 0, 1,
 0, 0, 0, 0, 0, 0,  0, 3, 3, 0, 0, 3,
 3, 3, 2, 0, 1, 0,  0, 1, 3, 2, 0, 3];

cLevel[LVL].iFindCount = 0;
cLevel[LVL].iFindTotal = 8;

cLevel[LVL].pFunction = function(aBlock)
{
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bClicked)
        {
            if(pBlock.m_iType === 1)
            {
                for(let j = 0; j < BLOCK_ALL; ++j)
                    aBlock[j].SetType(this.aiValue[j]);

                this.iFindCount = 0;
            }
            else if(pBlock.m_iType === 2)
            {
                pBlock.SetType(3);

                this.iFindCount += 1;
                if(this.iFindCount === 2)
                {
                    for(let j = 0; j < BLOCK_ALL; ++j)
                        if(aBlock[j].m_iType === 2) aBlock[j].SetColor(0);
                }
                else if(this.iFindCount === this.iFindTotal)
                {
                    this.bDone = true;
                }
            }

            break;
        }
    }
};


// ****************************************************************
// in order
LVL = 2;

cLevel[LVL].aiValue =
[0, 0, 0, 3, 3, 0,  0, 0, 0, 0, 0, 0,
 0, 0, 4, 0, 3, 0,  3, 0, 3, 3, 0, 0,
 0, 3, 0, 0, 0, 0,  0, 0, 3, 4, 0, 0,
 0, 3, 3, 0, 0, 0,  0, 0, 0, 0, 0, 3,
 0, 0, 0, 0, 0, 3,  3, 0, 0, 0, 3, 3,
 3, 0, 0, 0, 5, 0,  3, 0, 3, 0, 0, 0,

 0, 0, 0, 3, 0, 0,  0, 0, 0, 0, 0, 0,
 0, 0, 0, 3, 3, 0,  0, 3, 3, 0, 0, 3,
 3, 3, 0, 0, 0, 0,  0, 3, 4, 0, 0, 0,
 3, 4, 0, 0, 0, 3,  0, 0, 0, 0, 3, 0,
 0, 0, 0, 3, 0, 0,  0, 0, 0, 3, 3, 0,
 0, 0, 3, 3, 0, 0,  0, 3, 0, 0, 0, 0];

cLevel[LVL].aiOrder   = [64, 14, 109, 33, 104];
cLevel[LVL].aiCurrent = 0;

cLevel[LVL].pFunction = function(aBlock)
{
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bClicked && this.aiOrder.includes(i))
        {
            const iNext = (this.aiCurrent === this.aiOrder.length - 1) ? 0 : (this.aiCurrent + 1);

            if(this.aiOrder[iNext] !== i)
            {
                for(let j = 0, je = this.aiOrder.length; j < je; ++j)
                    aBlock[this.aiOrder[j]].SetType(4);
            }

            this.aiCurrent = this.aiOrder.indexOf(i);

            pBlock.SetType(5);

            this.bDone = true;
            for(let j = 0, je = this.aiOrder.length; j < je; ++j)
            {
                if(aBlock[this.aiOrder[j]].m_iType === 4)
                {
                    this.bDone = false;
                    break;
                }
            }

            break;
        }
    }
};


// ****************************************************************
// move together
LVL = 3;

cLevel[LVL].aiValue =
[0, 1, 0, 0, 1, 3,  3, 1, 0, 0, 1, 0,
 1, 1, 2, 1, 1, 1,  1, 1, 1, 1, 1, 1,
 0, 1, 6, 0, 2, 0,  0, 1, 0, 0, 1, 0,
 0, 1, 0, 0, 1, 0,  0, 1, 3, 0, 1, 0,
 1, 1, 1, 1, 1, 1,  1, 1, 1, 2, 1, 1,
 0, 1, 0, 0, 1, 3,  0, 1, 6, 0, 1, 0,

 3, 1, 0, 0, 1, 3,  0, 2, 0, 0, 1, 0,
 1, 1, 1, 1, 1, 2,  1, 1, 1, 1, 1, 1,
 0, 2, 3, 3, 1, 0,  0, 1, 0, 0, 1, 3,
 0, 1, 0, 3, 1, 0,  0, 1, 0, 0, 2, 3,
 1, 1, 1, 2, 1, 1,  1, 1, 1, 1, 1, 1,
 0, 1, 0, 0, 1, 0,  0, 1, 3, 0, 1, 0];

cLevel[LVL].aiOffsetX = [8, 2, 6, 9];
cLevel[LVL].aiOffsetY = [2, 9, 5, 3];
cLevel[LVL].aiStart   = [1, 4, 7, 10];

cLevel[LVL].pFunction = function(aBlock)
{
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bClicked)
        {
            const x = i % BLOCK_LINE;
            const y = Math.floor(i / BLOCK_LINE);

            const iIndexX = this.aiStart.indexOf(x);
            const iIndexY = this.aiStart.indexOf(y);

            if(iIndexX >= 0)
            {
                if(++this.aiOffsetX[iIndexX] >= BLOCK_LINE) this.aiOffsetX[iIndexX] = 0;
            }

            if(iIndexY >= 0)
            {
                if(++this.aiOffsetY[iIndexY] >= BLOCK_LINE) this.aiOffsetY[iIndexY] = 0;
            }

            for(let j = 0; j < BLOCK_ALL; ++j)
            {
                if(aBlock[j].m_iType === 2) aBlock[j].SetType(1);
            }

            for(let j = 0, je = this.aiOffsetX.length; j < je; ++j)
            {
                const iTarget = this.aiStart[j] + this.aiOffsetX[j] * BLOCK_LINE;
                aBlock[iTarget].SetType(2);
            }

            for(let j = 0, je = this.aiOffsetY.length; j < je; ++j)
            {
                const iTarget = this.aiOffsetY[j] + this.aiStart[j] * BLOCK_LINE;
                aBlock[iTarget].SetType((aBlock[iTarget].m_iType === 2) ? 3 : 2);
            }

            this.bDone = true;
            for(let i = 0; i < BLOCK_ALL; ++i)
            {
                if(aBlock[i].m_iType === 2)
                {
                    this.bDone = false;
                    break;
                }
            }

            break;
        }
    }
};


// ****************************************************************
// ice temple
// - drew expected path first
// - added blocks to accomplish the path
// - tried to block every "wrong" path
// - did some corrections to remove clustering blocks
// - there are two chambers in the corners preventing players from escape
LVL = 4;

cLevel[LVL].aiValue =
[3, 3, 3, 3, 3, 3,  3, 3, 3, 3, 2, 3,
 3, 0, 0, 0, 3, 0,  0, 0, 0, 3, 0, 3,
 3, 0, 0, 0, 0, 0,  0, 3, 0, 0, 0, 3,
 3, 3, 0, 0, 0, 0,  0, 0, 0, 3, 0, 3,
 3, 0, 0, 0, 3, 0,  3, 0, 0, 0, 0, 3,
 3, 0, 0, 0, 0, 0,  0, 0, 0, 3, 0, 3,

 3, 0, 0, 0, 0, 0,  0, 0, 0, 0, 0, 3,
 3, 0, 3, 0, 0, 0,  0, 0, 0, 0, 3, 3,
 3, 0, 0, 0, 3, 0,  0, 0, 0, 0, 0, 3,
 3, 1, 0, 0, 0, 0,  0, 0, 3, 0, 0, 3,
 3, 2, 1, 0, 0, 3,  0, 0, 0, 0, 0, 3,
 3, 3, 3, 3, 3, 3,  3, 3, 3, 3, 3, 3];

cLevel[LVL].pFunction = function(aBlock)
{
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bClicked)
        {
            if(pBlock.m_iType === 1)
            {
                let iDir = 0;
                     if(aBlock[i - 1]         .m_iType === 2) iDir =  1;
                else if(aBlock[i + 1]         .m_iType === 2) iDir = -1;
                else if(aBlock[i - BLOCK_LINE].m_iType === 2) iDir =  BLOCK_LINE;
                else if(aBlock[i + BLOCK_LINE].m_iType === 2) iDir = -BLOCK_LINE;

                let iTarget = i;
                while(aBlock[iTarget + iDir].m_iType < 2)
                {
                    iTarget += iDir;
                }

                if(aBlock[iTarget + iDir].m_iType === 2) this.bDone = true;

                const iCol1 =           ((i - iDir) % BLOCK_LINE);
                const iRow1 = Math.floor((i - iDir) / BLOCK_LINE);

                for(let j = iCol1 - 1; j <= iCol1 + 1; ++j)
                {
                    for(let k = iRow1 - 1; k <= iRow1 + 1; ++k)
                    {
                        const pOther = aBlock[j + k * BLOCK_LINE];

                        if(pOther.m_iType < 3)
                        {
                            pOther.SetType(0);
                            pOther.m_bActive = false;
                        }
                    }
                }

                aBlock[iTarget].SetType(2);
                aBlock[iTarget].m_bActive = true;

                const iCol2 =           (iTarget % BLOCK_LINE);
                const iRow2 = Math.floor(iTarget / BLOCK_LINE);

                for(let j = iCol2 - 1; j <= iCol2 + 1; ++j)
                {
                    for(let k = iRow2 - 1; k <= iRow2 + 1; ++k)
                    {
                        if((j === iCol2) || (k === iRow2))
                        {
                            const pOther = aBlock[j + k * BLOCK_LINE];

                            if(pOther.m_bActive === false)
                            {
                                pOther.SetType(1);
                                pOther.m_bActive = true;
                            }
                        }
                    }
                }
            }

            break;
        }
    }
};


// ****************************************************************
// rotate and match
LVL = 5;

cLevel[LVL].aiValue =
[0, 3, 3, 0, 0, 2,  2, 0, 0, 3, 3, 0,
 3, 4, 0, 3, 3, 4,  0, 3, 3, 4, 0, 2,
 3, 0, 0, 3, 3, 0,  0, 3, 3, 0, 0, 2,
 0, 2, 2, 0, 0, 2,  2, 0, 0, 3, 3, 0,
 0, 3, 3, 0, 0, 3,  3, 0, 0, 3, 3, 0,
 2, 4, 0, 3, 2, 4,  0, 2, 3, 4, 0, 3,

 2, 0, 0, 3, 2, 0,  0, 2, 3, 0, 0, 3,
 0, 2, 2, 0, 0, 3,  3, 0, 0, 2, 2, 0,
 0, 3, 3, 0, 0, 3,  3, 0, 0, 3, 3, 0,
 3, 4, 0, 3, 2, 4,  0, 3, 3, 4, 0, 3,
 3, 0, 0, 3, 2, 0,  0, 3, 3, 0, 0, 3,
 0, 2, 2, 0, 0, 3,  3, 0, 0, 2, 2, 0];

cLevel[LVL].pFunction = function(aBlock)
{
    for(let i = 0; i < BLOCK_ALL; ++i)
    {
        const pBlock = aBlock[i];

        if(pBlock.m_bClicked)
        {
            if(pBlock.m_iType === 4)
            {
                const iSave1 = aBlock[i - BLOCK_LINE]    .m_iType;
                const iSave2 = aBlock[i - BLOCK_LINE + 1].m_iType;

                // up
                aBlock[i - BLOCK_LINE]    .SetType(aBlock[i + 2]             .m_iType);
                aBlock[i - BLOCK_LINE + 1].SetType(aBlock[i + 2 + BLOCK_LINE].m_iType);

                // right
                aBlock[i + 2]             .SetType(aBlock[i + 2*BLOCK_LINE]    .m_iType);
                aBlock[i + 2 + BLOCK_LINE].SetType(aBlock[i + 2*BLOCK_LINE + 1].m_iType);

                // down
                aBlock[i + 2*BLOCK_LINE]    .SetType(aBlock[i - 1]             .m_iType);
                aBlock[i + 2*BLOCK_LINE + 1].SetType(aBlock[i - 1 + BLOCK_LINE].m_iType);

                // left
                aBlock[i - 1]             .SetType(iSave1);
                aBlock[i - 1 + BLOCK_LINE].SetType(iSave2);

                this.bDone = true;
                for(let j = 0; j < BLOCK_ALL; ++j)
                {
                    if(aBlock[j].m_iType === 2)
                    {
                        let iCount = 0;

                        if((j - 1          >= 0)         && aBlock[j - 1]         .m_iType === 2) iCount += 1;
                        if((j + 1          <  BLOCK_ALL) && aBlock[j + 1]         .m_iType === 2) iCount += 1;
                        if((j - BLOCK_LINE >= 0)         && aBlock[j - BLOCK_LINE].m_iType === 2) iCount += 1;
                        if((j + BLOCK_LINE <  BLOCK_ALL) && aBlock[j + BLOCK_LINE].m_iType === 2) iCount += 1;

                        if(iCount < 2)
                        {
                            this.bDone = false;
                            break;
                        }
                    }
                }
            }

            break;
        }
    }
};
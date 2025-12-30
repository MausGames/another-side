/////////////////////////////////////////////////////
//*-----------------------------------------------*//
//| Part of Throw Out (https://www.maus-games.at) |//
//*-----------------------------------------------*//
//| Copyright (c) 2014 Martin Mauersics           |//
//| Released under the zlib License               |//
//*-----------------------------------------------*//
/////////////////////////////////////////////////////
"use strict";
class CBackground extends windObject {


// ****************************************************************
static Init()
{
    CBackground.s_pModel  = new windModel ().Create(RES.CBackground.s_afVertexData,  RES.CBackground.s_aiIndexData);
    CBackground.s_pShader = new windShader().Create(RES.CBackground.s_sVertexShader, RES.CBackground.s_sFragmentShader);
}


// ****************************************************************
static Exit()
{
    CBackground.s_pModel .Destructor();
    CBackground.s_pShader.Destructor();
}


// ****************************************************************
constructor()
{
    super();

    this.m_pModel  = CBackground.s_pModel;
    this.m_pShader = CBackground.s_pShader;
}


// ****************************************************************
Render()
{
    GL.disable(GL.DEPTH_TEST);
    super.Render();
    GL.enable(GL.DEPTH_TEST);
}


} // class CBackground